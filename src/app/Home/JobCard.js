import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import numeral from "numeral";
import {
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlineStar,
  HiStar,
  HiBookOpen,
} from "react-icons/hi";

function JobCard({ job, storeOldJob, hiddenJobs, setHiddenJobs }) {
  const { client } = job;
  const [showMore, setShowMore] = useState(false);


  const timeAgo = job.publishedOn
    ? formatDistanceToNow(new Date(job.publishedOn))
    : "N/A";

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 capitalize">
            Posted {timeAgo} ago
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
        </div>

        <div>
          <button
            className={`p-2 rounded-full text-gray-600 hover:text-blue-600 ${
              hiddenJobs.find((i) => i === job.ciphertext)
                ? "!text-blue-600"
                : ""
            }`}
            title="Hide/Remove Job"
            onClick={() => {
              if (hiddenJobs.find((i) => i === job.ciphertext)) {
                const newList = hiddenJobs.filter((i) => i === job.ciphertext);
                setHiddenJobs(newList);
                localStorage.setItem("oldJobIds", JSON.stringify(newList));
                toast.success("Job added to the list.");
              } else {
                storeOldJob([job]);
                toast.success("Job removed from list.");
              }
            }}
          >
            <HiBookOpen className="h-7 w-7" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-700">
        <HiOutlineCurrencyDollar className="h-5 w-5 text-green-600" />
        <p className="">
          {job.type === 1 ? "Fixed-price" : "Hourly: "}
          <span className="font-bold">
            {job.type === 1
              ? " - Budget: $" + numeral(job.amount?.amount).format("0.[0]a")
              : job.hourlyBudget?.min + " - $" + job.hourlyBudget?.max}
          </span>{" "}
          – {job.tier}
        </p>
      </div>

      <p className="text-gray-600 text-sm">
        <span className={showMore ? "" : "line-clamp-3"}>
          {job.description}
        </span>
        <button
          className="text-blue-600 hover:underline ml-1"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "less" : "more"}
        </button>
      </p>

      <div className="flex flex-wrap gap-2">
        {job.skills.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {tag.prefLabel}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-gray-200 text-gray-500">
        <div className="flex items-center gap-2">
          <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-500" />
          Connect Price:{" "}
          <span className="text-gray-700 font-bold">{job.connectPrice}</span>
        </div>

        <div className="flex items-center gap-2">
          {job.client?.paymentVerificationStatus === 1 ? (
            <>
              <HiOutlineCheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">
                Payment Verified
              </span>
            </>
          ) : (
            <>
              <HiOutlineXCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-600 font-medium">
                Payment Unverified
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-500" />
          <strong>{numeral(client.totalSpent).format("0.[0]a")}</strong>spent
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineLocationMarker className="h-5 w-5 text-gray-500" />
          {client.location?.country}
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineLocationMarker className="h-5 w-5 text-gray-500" />
          Engagement: <strong>{job.type === 2 ? job.engagement : ""}</strong>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineClipboardList className="h-5 w-5 text-gray-500" />
          Proposals: <strong>{job.proposalsTier}</strong>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineClock className="h-5 w-5 text-gray-500" />
          Duration: {job.durationLabel}
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineUsers className="h-5 w-5 text-gray-500" />
          Hires: <strong>{client.totalHires}</strong>
        </div>

        <div className="flex items-center gap-2">
          <HiStar className="h-5 w-5 text-gray-500" />
          Feedbacks: <strong>{client.totalFeedback}</strong>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineStar className="h-5 w-5 text-gray-500" />
          Reviews: <strong>{client.totalReviews}</strong>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
