import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Chart from 'chart.js/auto';

import "./AdminReport.css"; // Import the CSS file

export default function AdminReport() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredFeedbackData, setFilteredFeedbackData] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0); // State to hold total feedbacks

  useEffect(() => {
    if (filterApplied) {
      fetchFilteredFeedbackData();
    } else {
      fetchFeedbackData();
    }
  }, [startDate, endDate, filterApplied]); // Include startDate, endDate, and filterApplied in the dependency array

  useEffect(() => {
    // Update the total feedbacks count when feedbackData changes
    setTotalFeedbacks(filterApplied ? filteredFeedbackData.length : feedbackData.length);
  }, [feedbackData, filteredFeedbackData, filterApplied]);

  const fetchFeedbackData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/feedback/get-feedbacks");
      setFeedbackData(response.data);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  const fetchFilteredFeedbackData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/feedback/get-feedbacks", {
        params: { startDate, endDate }
      });
      setFilteredFeedbackData(response.data);
    } catch (error) {
      console.error("Error fetching filtered feedback data:", error);
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Feedback Report",
    onafterprint: () => alert("Feedback report successfully downloaded"),
  });

  const calculateTotalsAndAverages = (data) => {
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    data.forEach((feedback) => {
      if (feedback.rating === "very-satisfied" || feedback.rating === "satisfied") {
        positiveCount++;
      } else if (feedback.rating === "very-disappointed" || feedback.rating === "disappointed") {
        negativeCount++;
      } else {
        neutralCount++;
      }
    });

    const totalFeedbacks = positiveCount + negativeCount + neutralCount;
    const positiveAverage = totalFeedbacks > 0 ? positiveCount / totalFeedbacks : 0;
    const negativeAverage = totalFeedbacks > 0 ? negativeCount / totalFeedbacks : 0;
    const neutralAverage = totalFeedbacks > 0 ? neutralCount / totalFeedbacks : 0;

    return { positiveCount, negativeCount, neutralCount, positiveAverage, negativeAverage, neutralAverage };
  };

  const { positiveCount, negativeCount, neutralCount, positiveAverage, negativeAverage, neutralAverage } = calculateTotalsAndAverages(filterApplied ? filteredFeedbackData : feedbackData);

  const handleFilterSubmit = () => {
    setFilterApplied(true);
  };

  useEffect(() => {
    const ctx = document.getElementById('feedbackChart').getContext('2d');
    const ratings = ['Extremely Disappointed', 'Disappointed', 'Neutral', 'Satisfied', 'Extremely Satisfied'];

    const ratingCounts = [0, 0, 0, 0, 0]; // Initialize counts for each rating

    (filterApplied ? filteredFeedbackData : feedbackData).forEach((feedback) => {
      switch (feedback.rating) {
        case 'very-disappointed':
          ratingCounts[0]++;
          break;
        case 'disappointed':
          ratingCounts[1]++;
          break;
        case 'neutral':
          ratingCounts[2]++;
          break;
        case 'satisfied':
          ratingCounts[3]++;
          break;
        case 'very-satisfied':
          ratingCounts[4]++;
          break;
        default:
          break;
      }
    });

    const feedbackChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ratings,
        datasets: [{
          label: 'Number of Feedbacks',
          data: ratingCounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 5,
            title: {
              display: true,
              text: 'Number of Feedbacks' // Add label for Y-axis
            }
          },
          x: {
            title: {
              display: true,
              text: 'Ratings' // Add label for X-axis
            }
          }
        },
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          }
        }
      }
    });
    

    return () => {
      feedbackChart.destroy();
    };
  }, [filterApplied, feedbackData, filteredFeedbackData]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Feedback Report</h1>
      </div>
      <div className="filters-container">
        <div className="filters">
          <h6 className="filter-heading">Date Range</h6>
          <div className="date-inputs">
            <label htmlFor="startDate">From:</label>
            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label htmlFor="endDate">To:</label>
            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <button className="filter-button" onClick={handleFilterSubmit}>Enter</button>
        </div>
        <div className="total-feedbacks-container"> 
          <div className="total-feedbacks">{totalFeedbacks}</div> 
          <div className="total-feedbacks-label">Total Feedbacks</div>
        </div>
      </div>
      
      <div ref={ComponentsRef} className="table-container">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Feedback Category</th>
              <th>Total No. of Feedbacks</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Positive Feedbacks</td>
              <td>{positiveCount}</td>
              <td>{positiveAverage.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Negative Feedbacks</td>
              <td>{negativeCount}</td>
              <td>{negativeAverage.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Neutral Feedbacks</td>
              <td>{neutralCount}</td>
              <td>{neutralAverage.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      
      <div className="chart-container">
        <canvas id="feedbackChart" width="400" height="200"></canvas>
      </div>
      </div>
      <button className="print-button" onClick={handlePrint}>Print</button>
    </div>
  );
}
