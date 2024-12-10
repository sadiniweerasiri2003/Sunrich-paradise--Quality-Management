import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackInquiryTable = (props) => {
  const [inquiries, setInquiries] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const inquiriesResponse = await axios.get("http://localhost:4000/Inquiry/");
        setInquiries(inquiriesResponse.data);

        const repliesResponse = await axios.get("http://localhost:4000/Reply/");
        setReplies(repliesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const feedbacksResponse = await axios.get("http://localhost:4000/Feedback/feedbacklist");
        setFeedbacks(feedbacksResponse.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchInquiries();
    fetchFeedbacks();
  }, []);


  const findReplyByInquiryId = (inquiryId) => {
    return replies.find((reply) => reply.inquiryid === inquiryId);
  };

  const handleEdit = async (id) => {
    // Fetch the inquiry by ID
    const inquiryToEdit = inquiries.find((inquiry) => inquiry._id === id);
  
    // Display a form with all details filled in
    const newName = prompt("Enter new name:", inquiryToEdit.name);
    const newEmail = prompt("Enter new email:", inquiryToEdit.email);
    const newTitle = prompt("Enter new title:", inquiryToEdit.inquiryTitle);
    const newBody = prompt("Enter new body:", inquiryToEdit.inquiryBody);
  
    // Send PUT request to update inquiry details
    try {
      await axios.put(`http://localhost:4000/Inquiry/update/${id}`, {
        name: newName,
        email: newEmail,
        inquiryTitle: newTitle,
        inquiryBody: newBody
      });
  
      // Update the inquiries state to reflect the changes
      setInquiries(
        inquiries.map((inquiry) => {
          if (inquiry._id === id) {
            return {
              ...inquiry,
              name: newName,
              email: newEmail,
              inquiryTitle: newTitle,
              inquiryBody: newBody
            };
          }
          return inquiry;
        })
      );
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };
  

  const handleDelete = async (id) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete the inquiry?");
  
    // If the user confirms deletion
    if (confirmDelete) {
      try {
        // Send DELETE request to delete the inquiry
        await axios.delete(`http://localhost:4000/Inquiry/delete/${id}`);
  
        // Update the inquiries state to remove the deleted inquiry
        setInquiries(inquiries.filter((inquiry) => inquiry._id !== id));
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };
  const handleEditFeedback = async (id) => {
    // Fetch the feedback by ID
    const feedbackToEdit = feedbacks.find((feedback) => feedback._id === id);
  
    // Display a form with all details filled in
    const newName = prompt("Enter new name:", feedbackToEdit.name);
    const newEmail = prompt("Enter new email:", feedbackToEdit.email);
    const newRating = prompt("Enter new rating:", feedbackToEdit.rating);
    const newReviewTitle = prompt("Enter new review title:", feedbackToEdit.reviewTitle);
  
    // Send PUT request to update feedback details
    try {
      await axios.put(`http://localhost:4000/Feedback/update/${id}`, {
        name: newName,
        email: newEmail,
        rating: newRating,
        reviewTitle: newReviewTitle,
      });
  
      // Update the feedbacks state to reflect the changes
      setFeedbacks(
        feedbacks.map((feedback) => {
          if (feedback._id === id) {
            return {
              ...feedback,
              name: newName,
              email: newEmail,
              rating: newRating,
              reviewTitle: newReviewTitle,
            };
          }
          return feedback;
        })
      );
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };
  
  const handleDeleteFeedback = async (id) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete the feedback?");
  
    // If the user confirms deletion
    if (confirmDelete) {
      try {
        // Send DELETE request to delete the feedback
        await axios.delete(`http://localhost:4000/Feedback/delete/${id}`);
  
        // Update the feedbacks state to remove the deleted feedback
        setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }
    }
  };
  
  
  return (
    <div>
      {/* Rendering Inquiries */}
      <h2 style={{ color: "green" }}>List Of Inquiries</h2>
      <table border="2" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Inquiry Title</th>
            <th>Inquiry Body</th>
            <th>Reply</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => {
            const reply = findReplyByInquiryId(inquiry._id);
            return (
              <tr key={inquiry._id}>
                <td>{inquiry.inquiryTitle}</td>
                <td>{inquiry.inquiryBody}</td>
                <td>{reply ? reply.reply : "Reply pending..."}</td>
                <td>
                  <button style={{ backgroundColor: "green", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }} onClick={() => handleEdit(inquiry._id)}>Edit</button>
                  <button  style={{ backgroundColor: "green", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", marginLeft: "5px" }}onClick={() => handleDelete(inquiry._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Rendering Feedbacks */}
      <h2 style={{ color: "green", marginTop: "20px" }}>List Of Feedbacks</h2>
      <table border="2" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Review Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.name}</td>
              <td>{feedback.rating}</td>
              <td>{feedback.reviewTitle}</td>
              <td>
                <button style={{ backgroundColor: "green", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}onClick={() => handleEditFeedback(feedback._id)}>Edit</button>
                <button style={{ backgroundColor: "green", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", marginLeft: "5px" }} onClick={() => handleDeleteFeedback(feedback._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackInquiryTable;