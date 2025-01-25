import React from "react";
import JobCard from "./JobCard";

export default function FilteredJobsList({ filteredJobs = [] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">
        3. Filtered Results ({filteredJobs.length})
      </h2>
      {filteredJobs.length === 0 && (
        <p className="text-gray-500">No jobs match the selected filters.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}
