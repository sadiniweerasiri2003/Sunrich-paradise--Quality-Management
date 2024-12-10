import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QualityManagerTable = () => {
  const [inquiries, setInquiries] = useState([]);
  const [replies, setReplies] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [showNavbar, setShowNavbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const inquiriesResponse = await axios.get("http://localhost:4000/Inquiry/");
        setInquiries(inquiriesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReplies = async () => {
      try {
        const repliesResponse = await axios.get("http://localhost:4000/Reply/");
        const replyData = repliesResponse.data.reduce((acc, reply) => {
          acc[reply.inquiryid] = reply;
          return acc;
        }, {});
        setReplies(replyData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInquiries();
    fetchReplies();
  }, []);

  const handleReply = async (event, inquiryId) => {
    event.preventDefault();

    const replyInput = event.target.elements.reply;
    const replyText = replyInput.value;

    if (!replyText) {
      console.error('Please enter a reply before submitting.');
      return;
    }

    try {
      const existingReply = replies[inquiryId];
      if (existingReply) {
        console.error('Reply already exists for this inquiry. Use edit to modify.');
        return;
      }

      const response = await axios.post("http://localhost:4000/Reply/add", { inquiryId, reply: replyText });
      console.log('Reply submitted successfully:', response.data);
      setReplies({ ...replies, [inquiryId]: response.data });
      replyInput.value = '';
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditReply = async (event, inquiryId) => {
    event.preventDefault();

    const replyInput = event.target.elements.reply;
    const updatedReplyText = replyInput.value;

    if (!updatedReplyText) {
      console.error('Please enter a reply before updating.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/Reply/${replies[inquiryId]._id}`, { reply: updatedReplyText });
      console.log('Reply updated successfully:', response.data);
      setReplies({ ...replies, [inquiryId]: response.data });
      setIsEditing({ ...isEditing, [inquiryId]: false });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReply = async (inquiryId) => {
    try {
      await axios.delete(`http://localhost:4000/Reply/${replies[inquiryId]._id}`);
      const updatedReplies = { ...replies };
      delete updatedReplies[inquiryId];
      setReplies(updatedReplies);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredInquiries = inquiries.filter((inquiry) => {
    const name = inquiry.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    const startIndex = name.indexOf(query);
    if (startIndex === -1) {
      return false; // Filter out if query is not found in name
    }

    const endIndex = startIndex + query.length;
    const highlightedName = `${name.substring(0, startIndex)}<span style="color: green;">${name.substring(startIndex, endIndex)}</span>${name.substring(endIndex)}`;
    inquiry.highlightedName = highlightedName;

    return true; // Include the inquiry in filtered results
  });

  return (
    <div className="qm-dashboard container-fluid d-flex flex-column min-vh-100 bg-dark text-white">
      <header className="qm-header row flex-grow-0 bg-success text-white align-items-center">
        <h2 className="col-12 qm-heading text-center" onClick={toggleNavbar}>Inquiry Management</h2>
      </header>
      
      <div className="text-center mb-3">
        <input
          type="text"
          className="form-control w-20 d-inline-block"
          style={{width:'600px',marginTop:'20px'}}
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredInquiries.length === 0 && (
        <div className="text-center text-danger">No inquiries found.</div>
      )}
      {filteredInquiries.length > 0 && (
        <>
          <div className="text-center">Showing {filteredInquiries.length} results.</div>
          <table className="table table-striped" style={{ margin: '20px 0' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Inquiry Title</th>
                <th>Inquiry Body</th>
                <th>Reply</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry) => {
                const submittedReply = replies[inquiry._id];

                return (
                  <tr key={inquiry._id}>
                    <td dangerouslySetInnerHTML={{__html: inquiry.highlightedName}}></td>
                    <td>{inquiry.email}</td>
                    <td>{inquiry.inquiryTitle}</td>
                    <td>{inquiry.inquiryBody}</td>
                    <td>
                      {submittedReply ? (
                        <div>
                          <div>{submittedReply.reply}</div>
                          {isEditing[inquiry._id] ? (
                            <form onSubmit={(e) => handleEditReply(e, inquiry._id)}>
                              <input type="text" name="reply" defaultValue={submittedReply.reply} />
                              <button type="submit" style={{ border: '2px solid green', color: 'green' }}>Update Reply</button>
                            </form>
                          ) : null}
                        </div>
                      ) : (
                        <form onSubmit={(e) => handleReply(e, inquiry._id)}>
                          <input type="text" name="reply" placeholder="Enter Reply" /> 
                          <button type="submit" style={{ border: '2px solid green', color: 'green' }}>Reply</button>
                        </form>
                      )}
                    </td>
                    <td>
                      {submittedReply && (
                        <div className="d-inline">
                          <button className="btn" style={{ border: '2px solid green', color: 'green',marginBottom:'4px' }} onClick={() => handleDeleteReply(inquiry._id)}>Delete</button>
                          <button className="btn" style={{ border: '2px solid green', color: 'green' }} onClick={() => setIsEditing({ ...isEditing, [inquiry._id]: true })}>Edit</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default QualityManagerTable;