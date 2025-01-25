function JobCard({ job }) {
  const { client } = job;
  return (
    <div className="border bg-white p-4 rounded shadow-sm">
      <h3 className="font-bold text-lg mb-2">{job.title}</h3>
      <p className="text-sm mb-1">
        <strong>Payment Verified:</strong> {job.paymentVerified ? "Yes" : "No"}
      </p>
      <p className="text-sm mb-1">
        <strong>Posted:</strong>{" "}
        {job.postedTime ? new Date(job.postedTime).toLocaleString() : "N/A"}
      </p>
      <p className="text-sm mb-1">
        <strong>Job Type:</strong> {job.jobType}
      </p>
      {job.jobType === "fixed" && (
        <p className="text-sm mb-1">
          <strong>Budget:</strong> ${job.budget}
        </p>
      )}
      {job.jobType === "hourly" && (
        <p className="text-sm mb-1">
          <strong>Hourly Rate:</strong> ${job.hourlyRate}
        </p>
      )}
      <p className="text-sm mb-1">
        <strong>Connect Price:</strong> {job.connectPrice}
      </p>
      <p className="text-sm mb-1">
        <strong>Duration:</strong> {job.duration}
      </p>
      <p className="text-sm mb-1">
        <strong>Tier:</strong> {job.tier}
      </p>
      <p className="text-sm mb-1">
        <strong>Proposals:</strong>{" "}
        {job.proposals === 0 ? "N/A" : `≥${job.proposals}`}
      </p>
      <hr className="my-2" />
      <div className="text-sm mb-1">
        <strong>Client Info:</strong>
        <ul className="pl-4 list-disc">
          <li>Dollar Spent: ${client.dollarSpent}</li>
          <li>Hires: {client.hires}</li>
          <li>Location: {client.location}</li>
          <li>Reviews: {client.reviewsCount}</li>
        </ul>
      </div>
      <p className="text-sm mb-1">
        <strong>Enterprise:</strong> {job.isEnterprise ? "Yes" : "No"}
      </p>
      <p className="text-sm mb-1">
        <strong>Premium:</strong> {job.isPremium ? "Yes" : "No"}
      </p>
      <p className="text-sm mb-1">
        <strong>Skills:</strong> {job.skills.join(", ")}
      </p>
    </div>
  );
}
export default JobCard;
