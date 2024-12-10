import React, { useState, useEffect } from 'react';

const FeedbackList = () => {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await fetch('http://localhost:4000/feedback/'); // Assuming this is your backend endpoint for fetching feedback
            const data = await response.json();
            setFeedbackList(data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    const deleteFeedback = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this feedback?');
        if (!confirmed) return; // If user cancels, exit the function

        try {
            await fetch(`http://localhost:4000/feedback/delete/${id}`, { 
                method: 'DELETE'
            });
            fetchFeedback(); // Refresh feedback list after deletion
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };
    
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Feedback List</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%', border: '2px solid green', borderRadius: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '15px', border: '1px solid black' }}>Name</th>
                        <th style={{ padding: '15px', border: '1px solid black' }}>Email</th>
                        <th style={{ padding: '15px', border: '1px solid black' }}>Rating</th>
                        <th style={{ padding: '15px', border: '1px solid black' }}>Review Title</th>
                        <th style={{ padding: '15px', border: '1px solid black' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackList.map((feedback) => (
                        <tr key={feedback._id} style={{ backgroundColor: 'white' }}>
                            <td style={{ padding: '15px', border: '1px solid black' }}>{feedback.name}</td>
                            <td style={{ padding: '15px', border: '1px solid black' }}>{feedback.email}</td>
                            <td style={{ padding: '15px', border: '1px solid black' }}>{feedback.rating}</td>
                            <td style={{ padding: '15px', border: '1px solid black' }}>{feedback.reviewTitle}</td>
                            <td style={{ padding: '15px', border: '1px solid black' }}>
                                <button onClick={() => deleteFeedback(feedback._id)} style={{ border: '2px solid green', padding: '8px 15px', borderRadius: '5px', backgroundColor: 'white', color: 'green', fontWeight: 'bold', cursor: 'pointer' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackList;
