import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddFeedback from "./Components/AddFeedback";
import AddInquiry from "./Components/AddInquiry";
import QmDashboard from "./QualityManager/QmDashboard";
import QualityManagerTable from "./Components/InquiryReply";
import ProductDetails from "./Components/DisplayFeedback";
import FeedbackInquiriesTable from "./Components/FeedbackInquiryList";
import DisplayFeedback from "./Components/DisplayFeedback";
import AdminReport from "./QualityManager/AdminReport";
import AdminInquiryReport from "./QualityManager/AdminInquiryReport";
import FeedbackList from "./QualityManager/AdminFeedbackList";
import ReportGenerationModel from "./QualityManager/ReportGenerationModel";
import AdminStockDamages from "./QualityManager/AdminStockDamages";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<QmDashboard/>} />
          <Route path="/quality-manager/inquiries" element={<QualityManagerTable />} />
          <Route path="/quality-manager/reports" element={<AdminReport />} />
          <Route path="/quality-manager/inquiry-reports" element={<AdminInquiryReport />} />
          <Route path="/quality-manager/feedback-list" element={<FeedbackList />} />
          <Route path="/quality-manager/reportGenerationOptions" element={<ReportGenerationModel />} />
          <Route path="/quality-manager/stock-damages" element={<AdminStockDamages />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
