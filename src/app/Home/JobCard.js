import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineLocationMarker,
} from "react-icons/hi";

function JobCard({ job }) {
  const { client } = job;
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 capitalize">
              Posted{" "}
              {job.postedTime
                ? formatDistanceToNow(new Date(new Date(job.postedTime)))
                : "N/A"}{" "}
              ago
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              {job.title}
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full">
              <HiOutlineHeart className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Budget Info */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <HiOutlineCurrencyDollar className="h-4 w-4" />
          <p className="text-sm capitalize">
            <strong>{job.jobType} - </strong> {job.tier} - Est. Budget: $
            {job.budget}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">
          <span className={showMore ? "" : "line-clamp-3"}>
            {job.description}
          </span>
          <button
            className="text-blue-600 hover:underline ml-1"
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {showMore ? "less" : "more"}
          </button>
        </p>

        {/* Tags */}
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

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-gray-200 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            Connect Price: {job.connectPrice}
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineClock className="h-4 w-4" />
            {job.paymentVerified ? "Payment verified" : "Payment unverified"}
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineCurrencyDollar className="h-4 w-4" />${client.dollarSpent}{" "}
            spent
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineLocationMarker className="h-4 w-4" />
            {client.location}
          </div>
          <div>
            Proposals: {job.proposals === 0 ? "N/A" : `≥${job.proposals}`}
          </div>
          <div className="flex items-center gap-2">Duration:{job.duration}</div>
          <div>Hires: {client.hires}</div>
          <div>Reviews: {client.reviewsCount}</div>
          <div>Enterprise: {job.isEnterprise ? "Yes" : "No"}</div>
          <div>Premium: {job.isPremium ? "Yes" : "No"}</div>
        </div>
      </div>
    </>
  );
}

export default JobCard;
