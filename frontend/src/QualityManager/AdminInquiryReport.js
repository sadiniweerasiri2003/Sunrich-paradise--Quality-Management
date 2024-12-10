import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Chart from 'chart.js/auto';

export default function AdminInquiryReport() {
  const [inquiryData, setInquiryData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredInquiryData, setFilteredInquiryData] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [totalInquiries, setTotalInquiries] = useState(0);

  useEffect(() => {
    if (filterApplied) {
      fetchFilteredInquiryData();
    } else {
      fetchInquiryData();
    }
  }, [startDate, endDate, filterApplied]);

  useEffect(() => {
    setTotalInquiries(filterApplied ? filteredInquiryData.length : inquiryData.length);
  }, [inquiryData, filteredInquiryData, filterApplied]);

  const fetchInquiryData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/inquiry/get-inquiries");
      setInquiryData(response.data);
    } catch (error) {
      console.error("Error fetching inquiry data:", error);
    }
  };

  const fetchFilteredInquiryData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/inquiry/inquiry/filter", {
        params: { startDate, endDate }
      });
      setFilteredInquiryData(response.data);
    } catch (error) {
      console.error("Error fetching filtered inquiry data:", error);
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Inquiry Report",
    onafterprint: () => alert("Inquiry report successfully downloaded"),
  });

  const handleFilterSubmit = () => {
    setFilterApplied(true);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ color: "#333" }}>Inquiry Report</h1>
      </div>
      <div style={{ marginBottom: "10px", marginRight: "400px" }}>
        <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
          <h6 style={{ marginBottom: "6px", color: "#555" }}>Date Range</h6>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "14px" }}>
            <label htmlFor="startDate" style={{ marginRight: "10px" }}>From:</label>
            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label htmlFor="endDate" style={{ marginRight: "10px", marginLeft: "10px" }}>To:</label>
            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <button style={{ padding: "8px 15px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={handleFilterSubmit}>Enter</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid rgb(165, 21, 21)", marginTop: "20px", marginRight: "200px" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{totalInquiries}</div>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#959191" }}>Total Inquiries</div>
        </div>
      </div>

      <div ref={ComponentsRef} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Email</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Inquiry Title</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Inquiry Body</th>
            </tr>
          </thead>
          <tbody>
            {filterApplied ? filteredInquiryData.map((inquiry) => (
              <tr key={inquiry._id}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{inquiry.name}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{inquiry.email}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{inquiry.inquiryTitle}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{inquiry.inquiryBody}</td>
              </tr>
            )) : inquiryData.map((inquiry) => (
              <tr key={inquiry._id}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{inquiry.name}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{inquiry.email}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{inquiry.inquiryTitle}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{inquiry.inquiryBody}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="chart-container">
          <canvas id="inquiryChart" width="400" height="200"></canvas>
        </div>
      </div>
      <button style={{ display: "block", width: "100%", padding: "10px 0", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", marginTop: "20px" }} onClick={handlePrint}>Print</button>
    </div>
  );
}
