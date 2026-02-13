import UserDetailsCard from "./UserDetailsCard";
import QuizHistoryTable from "./QuizHistoryTable";
import ResilienceTrendChart from "./ResilienceTrendChart";
import AIRecommendationPreview from "./AIRecommendationPreview";
import DownloadReportButton from "./DownloadReportButton";
import Navbar from "../navbar";

export default function ProfileDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <Navbar />
      <UserDetailsCard />

      <QuizHistoryTable />
      <div className="grid md:grid-cols-2 gap-6">
        <ResilienceTrendChart />
        <AIRecommendationPreview />
      </div>
      {/* <div className="flex justify-end">
        <DownloadReportButton />
      </div> */}
    </div>
  );
}
