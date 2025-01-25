"use client";
import { useState, useMemo, useEffect } from "react";
import JsonInput from "./JsonInput";
import FiltersPanel from "./FiltersPanel";
import FilteredJobsList from "./FilteredJobsList";
import toast from "react-hot-toast";

export default function HomePage() {
  // =====================
  // 1. Raw JSON input
  // =====================
  const [jsonInput, setJsonInput] = useState("");

  // =====================
  // 2. Parsed jobs
  // =====================
  const [jobs, setJobs] = useState([]);

  // =====================
  // 3. Filters in ONE object
  // =====================
  const [filters, setFilters] = useState({
    paymentVerified: false,
    hideOldJobs: false,
    postedHours: 0,
    projectDuration: "",
    budgetMin: "",
    budgetMax: "",
    jobType: "both",
    connectRangeMin: "",
    connectRangeMax: "",

    dollarSpentMin: "",
    dollarSpentMax: "",
    hiresMin: "",
    hiresMax: "",
    includeLocations: [],
    excludeLocations: [],

    reviewsCountMin: "",
    reviewsCountMax: "",
    isEnterprise: false,
    isPremium: false,

    skillsFilter: [],

    tier: "",
    proposalsMin: "",
    proposalsMax: "",

    hourlyMin: "",
    hourlyMax: "",
  });

  // On mount, try to load filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem("savedUpworkFilters");
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        setFilters(parsed);
      } catch (err) {
        console.error("Error parsing filters from localStorage", err);
      }
    }
  }, []);

  // A helper to manually save filters to localStorage
  const handleSaveFilters = () => {
    localStorage.setItem("savedUpworkFilters", JSON.stringify(filters));
  };

  // Helper to update a single field in the `filters` object
  const updateFilter = (fieldName, value) => {
    setFilters((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // =====================
  // 4. Parse JSON
  // =====================
  const handleParseJson = () => {
    try {
      const parsed = JSON.parse(jsonInput).data.bestMatchJobsFeed.results;
      if (Array.isArray(parsed)) {
        const transformed = parsed.map((raw) => {
          const payStatus = raw.client?.paymentVerificationStatus === 1;

          let typeString = "other";
          if (raw.type === 1) typeString = "fixed";
          if (raw.type === 2) typeString = "hourly";

          // Convert proposals string (e.g. "50+") into a number
          let proposalsNum = 0;
          if (typeof raw.proposalsTier === "string") {
            const numeric = parseInt(raw.proposalsTier);
            if (!isNaN(numeric)) {
              proposalsNum = numeric;
            }
          }

          // Collect skill names
          const skillLabels = raw.skills?.map((s) => s.prefLabel) || [];

          // For demo, let's pick the "max" as the hourlyRate
          const hourlyRate = raw.hourlyBudget?.max || 0;

          return {
            title: raw.title,
            description: raw.description,
            postedTime: raw.publishedOn,
            paymentVerified: payStatus,
            jobType: typeString,
            duration: raw.durationLabel,
            description: raw.description,
            budget: raw.amount?.amount || 0,
            hourlyRate,
            connectPrice: raw.connectPrice || 0,
            ciphertext: raw.ciphertext,
            client: {
              dollarSpent: raw.client?.totalSpent || 0,
              hires: raw.client?.totalHires || 0,
              location: raw.client?.location?.country || "Unknown",
              reviewsCount: raw.client?.totalReviews || 0,
            },

            isEnterprise: raw.enterpriseJob || false,
            isPremium: raw.premium || false,
            skills: skillLabels,
            tier: raw.tier || "",
            proposals: proposalsNum,
          };
        });
        setJobs(transformed);
      } else {
        alert("JSON must be an array of job objects");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid JSON format");
    }
  };

  function getOldJobs() {
    const stored = localStorage.getItem("oldJobIds");
    return stored ? JSON.parse(stored) : [];
  }

  // A helper to save an ID into localStorage
  function storeOldJob(jobs) {
    const oldJobs = getOldJobs();
    // If not already stored, add it
    jobs.map((job) => {
      if (!oldJobs.includes(job.ciphertext)) {
        oldJobs.push(job.ciphertext);
        localStorage.setItem("oldJobIds", JSON.stringify(oldJobs));
      }
    });
  }

  // =====================
  // 5. Filter logic
  // =====================
  const filteredJobs = useMemo(() => {
    let filterJob = null;
    if (filters.hideOldJobs) {
      const oldJobs = getOldJobs(); // read from localStorage or from Redux
      filterJob = jobs.filter((job) => !oldJobs.includes(job.ciphertext));
    }

    return filterJob
      ? filterJob
      : jobs.filter((job) => {
          // Destructure filters for convenience
          const {
            paymentVerified,
            postedHours,
            projectDuration,
            budgetMin,
            budgetMax,
            jobType,
            connectRangeMin,
            connectRangeMax,

            dollarSpentMin,
            dollarSpentMax,
            hiresMin,
            hiresMax,
            includeLocations,
            excludeLocations,

            reviewsCountMin,
            reviewsCountMax,
            isEnterprise,
            isPremium,

            skillsFilter,
            tier,
            proposalsMin,
            proposalsMax,

            hourlyMin,
            hourlyMax,
          } = filters;

          // 1. Payment verified
          if (paymentVerified && !job.paymentVerified) return false;

          // 2. Posted within X hours
          if (postedHours > 0) {
            const now = new Date();
            const published = new Date(job.postedTime);
            const diffHours = (now - published) / 36e5;
            if (diffHours > postedHours) return false;
          }

          // 3. Project duration
          if (projectDuration && job.duration !== projectDuration) return false;

          // 4. Budget range (only for fixed)
          if (job.jobType === "fixed") {
            if (budgetMin && job.budget < budgetMin) return false;
            if (budgetMax && job.budget > budgetMax) return false;
          }

          // 5. Job Type
          if (jobType !== "both" && job.jobType !== jobType) return false;

          // 6. Connect range
          if (connectRangeMin && job.connectPrice < connectRangeMin)
            return false;
          if (connectRangeMax && job.connectPrice > connectRangeMax)
            return false;

          // 7. Client filters
          const client = job.client;
          // dollarSpent
          if (dollarSpentMin && client.dollarSpent < dollarSpentMin)
            return false;
          if (dollarSpentMax && client.dollarSpent > dollarSpentMax)
            return false;
          // hires
          if (hiresMin && client.hires < hiresMin) return false;
          if (hiresMax && client.hires > hiresMax) return false;

          // location includes / excludes
          if (
            includeLocations.length > 0 &&
            !includeLocations.includes(client.location)
          ) {
            return false;
          }
          if (
            excludeLocations.length > 0 &&
            excludeLocations.includes(client.location)
          ) {
            return false;
          }

          // reviews
          if (reviewsCountMin && client.reviewsCount < reviewsCountMin)
            return false;
          if (reviewsCountMax && client.reviewsCount > reviewsCountMax)
            return false;

          // enterprise / premium
          if (isEnterprise && !job.isEnterprise) return false;
          if (isPremium && !job.isPremium) return false;

          // 8. Skills filter
          if (skillsFilter.length > 0) {
            const hasAll = skillsFilter.every((skill) =>
              job.skills.includes(skill)
            );
            if (!hasAll) return false;
          }

          // 9. Tier filter
          if (tier && job.tier.toLowerCase() !== tier.toLowerCase())
            return false;

          // 10. Proposals
          if (proposalsMin && job.proposals < proposalsMin) return false;
          if (proposalsMax && job.proposals > proposalsMax) return false;

          // 11. Hourly range
          if (job.jobType === "hourly") {
            if (hourlyMin && job.hourlyRate < hourlyMin) return false;
            if (hourlyMax && job.hourlyRate > hourlyMax) return false;
          }

          return true;
        });
  }, [jobs, filters]);

  // =====================
  // RENDER
  // =====================
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      <div className="max-h-dvh overflow-auto p-3 w-96">
        <JsonInput
          jsonInput={jsonInput}
          setJsonInput={setJsonInput}
          onParseJson={handleParseJson}
        />
        <FiltersPanel
          filters={filters}
          updateFilter={updateFilter}
          onSaveFilters={handleSaveFilters}
        />
      </div>

      <div className="p-4 w-[calc(100%-384px)] max-h-dvh overflow-auto">
        <FilteredJobsList
          filteredJobs={filteredJobs}
          storeOldJob={storeOldJob}
        />
      </div>
    </div>
  );
}
