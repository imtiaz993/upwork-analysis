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
  HiOutlineLightningBolt,
  HiTrash,
} from "react-icons/hi";

function JobCard({ job, storeOldJob }) {
  const { client } = job;
  const [showMore, setShowMore] = useState(false);

  const timeAgo = job.postedTime
    ? formatDistanceToNow(new Date(job.postedTime))
    : "N/A";

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 capitalize">
            Posted {timeAgo} ago
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
        </div>

        {/* "Hide/Remove Job" button */}
        <div>
          <button
            className="p-2 rounded-full text-gray-600 hover:text-red-600"
            title="Hide/Remove Job"
            onClick={() => {
              storeOldJob([job]);
              toast.success("Job removed from list.");
            }}
          >
            <HiTrash className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Budget / Type / Tier */}
      <div className="flex items-center gap-2 text-gray-700">
        <HiOutlineCurrencyDollar className="h-5 w-5 text-green-600" />
        <p className="capitalize">
          {job.jobType} – {job.tier} –{" "}
          <span className="font-bold">
            Budget: ${numeral(job.budget).format("0.[0]a")}
          </span>
        </p>
      </div>

      {/* Description */}
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

      {/* Skills / Tags */}
      <div className="flex flex-wrap gap-2">
        {job.skills.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-gray-200 text-gray-500">
        {/* Connect Price */}
        <div className="flex items-center gap-2">
          <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-500" />
          Connect Price:{" "}
          <span className="text-gray-700 font-bold">{job.connectPrice}</span>
        </div>

        {/* Payment Verified / Unverified */}
        <div className="flex items-center gap-2">
          {job.paymentVerified ? (
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

        {/* Dollar Spent */}
        <div className="flex items-center gap-2">
          <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-500" />
          <strong>{numeral(client.dollarSpent).format("0.[0]a")}</strong>spent
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <HiOutlineLocationMarker className="h-5 w-5 text-gray-500" />
          {client.location}
        </div>

        {/* Proposals */}
        <div className="flex items-center gap-2">
          <HiOutlineClipboardList className="h-5 w-5 text-gray-500" />
          Proposals:{" "}
          <strong>{job.proposals === 0 ? "N/A" : `${job.proposals}+`}</strong>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2">
          <HiOutlineClock className="h-5 w-5 text-gray-500" />
          Duration: {job.duration}
        </div>

        {/* Hires */}
        <div className="flex items-center gap-2">
          <HiOutlineUsers className="h-5 w-5 text-gray-500" />
          Hires: <strong>{client.hires}</strong>
        </div>

        {/* Reviews */}
        <div className="flex items-center gap-2">
          <HiOutlineStar className="h-5 w-5 text-gray-500" />
          Reviews: <strong>{client.reviewsCount}</strong>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
