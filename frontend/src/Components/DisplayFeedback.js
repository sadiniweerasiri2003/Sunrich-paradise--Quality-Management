import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFeedback from "./AddFeedback"; // Import AddFeedback component

export default function DisplayFeedback({ productId }) {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/feedback`);
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [productId]);

  // Function to calculate time difference
  const timeDifference = (timestamp) => {
    const currentTime = Date.now();
    const diff = currentTime - new Date(timestamp);
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };
  // Automated response based on rating
  const getAutomatedResponse = (rating) => {
    const replies = {
      "very-disappointed":
        "Sorry to hear that you're very disappointed with our product. We'll do our best to improve your experience. Please contact us if you have any suggestions.",
      disappointed:
        "We're sorry to hear you're disappointed. Let us know how we can improve your experience.",
      neutral: "Thank you for your feedback.",
      satisfied: "We're glad you're satisfied with our product!",
      "very-satisfied":
        "We're thrilled that you're very satisfied! Thank you for your feedback.",
    };
    return replies[rating];
  };

  return (
    <div className="product-details">
      <div className="ratings-section mb-3 bg-light p-4">
        <h2 style={{ fontSize: "19px" }}>Ratings & Reviews</h2>
        <hr className="ratings-line" />
        <AddFeedback />
        {feedback.length > 0 ? (
          <ul className="list-group list-group-flush">
            {feedback.map((feedbackItem) => (
              <li key={feedbackItem._id} className="list-group-item border-0">
                <div
                  style={{
                    border: "2px black",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <h6 className="mb-2">
                    {feedbackItem.rating.charAt(0).toUpperCase() +
                      feedbackItem.rating.slice(1)}
                  </h6>
                  <p
                    className="text-muted mb-1 medium"
                    style={{ fontSize: "13px", fontWeight: "bold" }}
                  >
                    by {feedbackItem.name}
                  </p>
                  <p
                    className="text-muted mb-3"
                    style={{
                      fontSize: "12px",
                      marginBottom: "1px",
                      lineHeight: "0.8",
                    }}
                  >
                    {timeDifference(feedbackItem.createdAt)}
                  </p>
                  <p
                    className="text-justify mb-3"
                    style={{
                      fontSize: "14px",
                      marginBottom: "2px",
                      lineHeight: "0.8",
                    }}
                  >
                    {feedbackItem.reviewTitle}
                  </p>
                  <div
                    className="d-flex flex-wrap"
                    style={{ lineHeight: "0.8" }}
                  >
                    {feedbackItem.images &&
                      feedbackItem.images.map((imagePath) => (
                        <img
                          key={imagePath}
                          src={`http://localhost:4000/${imagePath}`}
                          alt="Feedback Image"
                          className="rounded mr-2 mb-2"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            marginRight: "8px",
                            marginBottom: "5px",
                          }}
                        />
                      ))}
                  </div>
                  <div
                    className="alert alert-light small mt-3"
                    role="alert"
                    style={{
                      marginTop: "2px",
                      marginBottom: "0",
                      color: "green",
                      lineHeight: "0.8",
                    }}
                  >
                    <h4 className="alert-heading" style={{ fontSize: "15px" }}>
                      Response
                    </h4>
                    <p
                      style={{ fontSize: "13px", margin: "0", color: "green" }}
                    >
                      {getAutomatedResponse(feedbackItem.rating)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
}
