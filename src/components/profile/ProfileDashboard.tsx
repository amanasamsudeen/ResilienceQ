import UserDetailsCard from "./UserDetailsCard";
import QuizHistoryTable from "./QuizHistoryTable";
import ResilienceTrendChart from "./ResilienceTrendChart";
import AIRecommendationPreview from "./AIRecommendationPreview";
import DownloadReportButton from "./DownloadReportButton";
import Navbar from "../navbar";
import AICoachPanel from "./AiCoachpanel";

export default function ProfileDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <Navbar />
      <UserDetailsCard />

      <div className="grid md:grid-cols-2 gap-6">
        {/* <ResilienceTrendChart /> */}
        <AICoachPanel />
        <AIRecommendationPreview />
      </div>
      <QuizHistoryTable />
      {/* <div className="flex justify-end">
        <DownloadReportButton />
      </div> */}
    </div>
  );
}
