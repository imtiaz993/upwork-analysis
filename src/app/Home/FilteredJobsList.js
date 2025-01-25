import { useState } from "react";
import JobCard from "./JobCard";
import toast from "react-hot-toast";

export default function FilteredJobsList({ filteredJobs = [], storeOldJob }) {
  const [activeTab, setActiveTab] = useState("All");

  // Filter jobs based on the selected tab
  const getFilteredJobs = () => {
    if (activeTab === "Fixed Price") {
      return filteredJobs.filter((job) => job.jobType === "fixed");
    }
    if (activeTab === "Hourly") {
      return filteredJobs.filter((job) => job.jobType === "hourly");
    }
    return filteredJobs;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 pb-0 sticky top-0 bg-gray-50 shadow">
        <h2 className="text-xl font-semibold">
          Filtered Results ({getFilteredJobs().length})
        </h2>
        <div className="flex border-b border-gray-300 mb-4">
          {["All", "Fixed Price", "Hourly"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-6 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {filteredJobs && filteredJobs.length > 0 && (
          <button
            className="py-2 px-4 bg-blue-600 text-white rounded"
            onClick={() => {
              storeOldJob(jobs);
              toast.success("Jobs removed from list.");
            }}
          >
            Hide All Job
          </button>
        )}
      </div>
      {filteredJobs.length === 0 && (
        <p className="text-gray-500 p-4">No jobs match the selected filters.</p>
      )}
      <div className="flex flex-col gap-4 p-4">
        {getFilteredJobs().map((job, index) => (
          <JobCard key={index} job={job} storeOldJob={storeOldJob} />
        ))}
      </div>
    </div>
  );
}
