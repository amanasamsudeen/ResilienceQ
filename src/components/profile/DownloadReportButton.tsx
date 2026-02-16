export default function DownloadReportButton() {
  const downloadReport = async () => {
    const token = localStorage.getItem("access_token");
    const API_URL = import.meta.env.PUBLIC_API_URL;

    const response = await fetch(`${API_URL}/report/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Resilience_Report.pdf";
    a.click();
  };

  return (
    <button
      onClick={downloadReport}
      className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
    >
      Download Full Report
    </button>
  );
}
