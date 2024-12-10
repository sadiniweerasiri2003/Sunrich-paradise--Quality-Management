import React from 'react';
import { BsFillFileEarmarkTextFill, BsGraphUp } from 'react-icons/bs';
import './reportgenerationModel.css'; 

const ReportGenerationModel = ({ onClose, onFeedbackReportClick, onInquiryReportClick }) => {
  return (
    <div className="report-modal">
      <div className="modal-content">
        <h2>Report Generation</h2>
        <div className="buttons-container">
          <button className="green-button" onClick={onFeedbackReportClick}>
            <BsGraphUp className="dashboard-icon" />
            <span className="dashboard-text">Feedback Report</span>
          </button>
          <button className="green-button" onClick={onInquiryReportClick}>
            <BsFillFileEarmarkTextFill className="dashboard-icon" />
            <span className="dashboard-text">Inquiry Report</span>
          </button>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReportGenerationModel;
