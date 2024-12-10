import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminFeedback = () => {
  const [allFeedbacks, setAllFeedbacks] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/feedback")
      .then((res) => {
        setAllFeedbacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Feedback Title</th>
          <th>Feedback Body</th>
          <th>Reply</th>
          <th>Actions</th>
        </tr>
      </thead>
    </table>
  );
};

export default AdminFeedback;
