import React from "react";
import JobCard from "./JobCard";
import toast from "react-hot-toast";

export default function FilteredJobsList({ filteredJobs = [], storeOldJob }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Filtered Results ({filteredJobs.length})
        </h2>
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
        <p className="text-gray-500">No jobs match the selected filters.</p>
      )}
      <div className="flex flex-col gap-4">
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} storeOldJob={storeOldJob} />
        ))}
      </div>
    </div>
  );
}
