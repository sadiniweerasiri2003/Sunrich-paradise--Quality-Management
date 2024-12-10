import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsChatDots, BsFillFileEarmarkTextFill, BsGraphUp, BsExclamationTriangleFill } from "react-icons/bs"; // Added BsExclamationTriangleFill
import "../Components/QmDashboard.css";
import ReportGenerationModel from "./ReportGenerationModel";

const QmDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFeedbackReportClick = () => {
    navigate("/quality-manager/reports");
  };

  const handleInquiryReportClick = () => {
    navigate("/quality-manager/inquiry-reports");
  };

  const handleStockDamagesClick = () => {
    navigate("/quality-manager/stock-damages");
  };

  return (
    <div className="qm-dashboard container-fluid d-flex flex-column min-vh-100 bg-dark text-white">
      <header className="qm-header row flex-grow-0 bg-success text-white align-items-center">
        <h1 className="col-12 qm-heading text-center">
          Quality Manager Dashboard
        </h1>
      </header>
      <nav className="qm-nav row justify-content-center">
        <ul className="nav col-md-8 d-flex flex-wrap justify-content-between custom-nav">
          <li className="nav-item">
            <Link to="/quality-manager/inquiries" className="nav-link text-white">
              <div className="dashboard-button">
                <BsChatDots className="dashboard-icon" />
                <span className="dashboard-text">Inquiry Management</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/quality-manager/feedback-list" className="nav-link text-white">
              <div className="dashboard-button">
                <BsFillFileEarmarkTextFill className="dashboard-icon" />
                <span className="dashboard-text">Feedback Management</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <button className="dashboard-button" onClick={toggleModal}>
              <BsGraphUp className="dashboard-icon" />
              <span className="dashboard-text">Report Generation</span>
            </button>
          </li>
          <li className="nav-item">
            <Link to="/quality-manager/stock-damages" className="nav-link text-white">
              <div className="dashboard-button" onClick={handleStockDamagesClick}>
                <BsExclamationTriangleFill className="dashboard-icon" /> 
                <span className="dashboard-text">Stock Damages</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      {showModal && <div className="blurred-background"></div>}
      {showModal && (
        <div className="report-modal-container">
          <div className="report-modal">
            <ReportGenerationModel
              onClose={toggleModal}
              onFeedbackReportClick={handleFeedbackReportClick}
              onInquiryReportClick={handleInquiryReportClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QmDashboard;
