import React, { useState } from "react";
import axios from "axios";

export default function AddFeedback() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setShowFeedbackForm(!showFeedbackForm); // Toggle form visibility on click
  };
  const onInputChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 5) {
      // Display message if more than 5 files are selected
      alert("Maximum 5 images allowed.");
    } else {
      // Update images state with selected files
      const updatedImages = Array.from(selectedFiles).slice(0, 5); // Limit to 5 files
      setImages(updatedImages);
    }
  };

  const sendData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("rating", rating);
    formData.append("reviewTitle", reviewTitle);
    images.forEach((image) => formData.append("images", image));

    axios
      .post("http://localhost:4000/feedback/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Feedback added successfully.");
        setShowFeedbackForm(false);
        setName("");
        setEmail("");
        setRating("");
        setReviewTitle("");
        setImages([]);
        setErrorMessage("");
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.error || "An error occurred.");
        } else if (err.request) {
          setErrorMessage("No response received from the server.");
        } else {
          setErrorMessage("Error sending request.");
        }
      });
  };

  return (
    <div className="container">
      <button
        className="btn btn-primary"
        style={{
          backgroundColor: "white",
          border: "2px solid green",
          color: "green",
          padding: "10px 20px",
          borderRadius: "3px",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          marginBottom: "5px",
        }}
        onClick={handleClick}
      >
        Write a Feedback
      </button>
      {showFeedbackForm && ( // Conditionally render the form
        <div className="container" style={{ maxWidth: "500px", margin: "0px" }}>
          <form
            onSubmit={sendData}
            style={{
              border: "2px solid #4CAF50" /* Green border */,
              backgroundColor: "white" /* White background */,
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rating</label>
              <div>
                <input
                  type="radio"
                  id="very-disappointed"
                  name="rating"
                  value="very-disappointed"
                  checked={rating === "very-disappointed"}
                  onChange={(e) => setRating(e.target.value)}
                />
                <label htmlFor="very-disappointed">Very Disappointed</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="disappointed"
                  name="rating"
                  value="disappointed"
                  checked={rating === "disappointed"}
                  onChange={(e) => setRating(e.target.value)}
                />
                <label htmlFor="disappointed">Disappointed</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="neutral"
                  name="rating"
                  value="neutral"
                  checked={rating === "neutral"}
                  onChange={(e) => setRating(e.target.value)}
                />
                <label htmlFor="neutral">Neutral</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="satisfied"
                  name="rating"
                  value="satisfied"
                  checked={rating === "satisfied"}
                  onChange={(e) => setRating(e.target.value)}
                />
                <label htmlFor="satisfied">Satisfied</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="very-satisfied"
                  name="rating"
                  value="very-satisfied"
                  checked={rating === "very-satisfied"}
                  onChange={(e) => setRating(e.target.value)}
                />
                <label htmlFor="very-satisfied">Very Satisfied</label>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="review" className="form-label">
                Review
              </label>
              <textarea
                className="form-control"
                id="review"
                rows="3"
                placeholder="Enter your review here"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="images" className="form-label">
                Add your Photos
              </label>
              <br></br>
              <input
                type="file"
                accept="image/*"
                onChange={onInputChange}
                multiple
              ></input>
            </div>

            <div className="text-danger">{errorMessage}</div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                color: "green",
                backgroundColor: "white",
                border: "2px solid green",
                padding: "10px 20px",
                borderRadius: "3px",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
