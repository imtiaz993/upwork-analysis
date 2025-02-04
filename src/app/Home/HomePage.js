"use client";
import { useState, useMemo, useEffect } from "react";
import JsonInput from "./JsonInput";
import FiltersPanel from "./FiltersPanel";
import FilteredJobsList from "./FilteredJobsList";
import { intialFilters } from "./data";

export default function HomePage() {
  const [jsonInput, setJsonInput] = useState("");
  const [jobs, setJobs] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const [filters, setFilters] = useState({
    hideOldJobs: false,
    paymentVerified: false,
    postedHours: 0,
    budgetMin: "",
    budgetMax: "",
    connectRangeMin: "",
    connectRangeMax: "",
    dollarSpentMin: "",
    dollarSpentMax: "",
    hiresMin: "",
    hiresMax: "",
    reviewsCountMin: "",
    reviewsCountMax: "",
    proposalsMin: "",
    proposalsMax: "",
    hourlyMin: "",
    hourlyMax: "",
    isInclude: false,
    listOfCountries: [],
  });

  // On mount, try to load filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem("savedUpworkFilters");
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        console.log(parsed);

        setFilters(parsed);
      } catch (err) {
        console.error("Error parsing filters from localStorage", err);
      }
    } else {
      setFilters(intialFilters);
      localStorage.setItem("savedUpworkFilters", JSON.stringify(intialFilters));
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

  const handleParseJson = () => {
    try {
      const parsed = JSON.parse(jsonInput).data.bestMatchJobsFeed.results;
      setJobs(parsed);
    } catch (error) {
      console.error(error);
      alert("Invalid JSON format");
    }
  };

  function getOldJobs() {
    const stored = localStorage.getItem("oldJobIds");
    return stored ? JSON.parse(stored) : [];
  }

  useEffect(() => {
    if (typeof window != "undefined") {
      setHiddenJobs(getOldJobs());
    }
  }, []);

  // A helper to save an ID into localStorage
  function storeOldJob(jobs) {
    const oldJobs = [...hiddenJobs];
    // If not already stored, add it
    jobs.map((job) => {
      if (!oldJobs.includes(job.ciphertext)) {
        oldJobs.push(job.ciphertext);
        localStorage.setItem("oldJobIds", JSON.stringify(oldJobs));
        setHiddenJobs(oldJobs);
      }
    });
  }

  // A helper to save an ID into localStorage
  function restoreOldJobs() {
    localStorage.setItem("oldJobIds", JSON.stringify([]));
    setHiddenJobs([]);
  }

  const filteredJobs = useMemo(() => {
    let filterJob = null;
    if (filters.hideOldJobs) {
      filterJob = jobs.filter((job) => !hiddenJobs.includes(job.ciphertext));
    }
    return (filterJob ? filterJob : jobs).filter((job) => {
      const {
        paymentVerified,
        postedHours,
        budgetMin,
        budgetMax,
        connectRangeMin,
        connectRangeMax,
        dollarSpentMin,
        dollarSpentMax,
        hiresMin,
        hiresMax,
        reviewsCountMin,
        reviewsCountMax,
        proposalsMin,
        proposalsMax,
        hourlyMin,
        hourlyMax,
        isInclude,
        listOfCountries,
      } = filters;

      if (job.isApplied) return false;
      // 1. Payment verified
      if (paymentVerified && job.client?.paymentVerificationStatus === 2)
        return false;

      // 2. Posted within X hours
      if (postedHours > 0) {
        const now = new Date();
        const published = new Date(job.publishedOn);
        const diffHours = (now - published) / 36e5;
        if (diffHours > postedHours) return false;
      }

      // 4. Budget range (only for fixed)
      if (job.type === 1) {
        if (budgetMin && job.amount?.amount < budgetMin) return false;
        if (budgetMax && job.amount?.amount > budgetMax) return false;
      }

      // 6. Connect range
      if (connectRangeMin && job.connectPrice < connectRangeMin) return false;
      if (connectRangeMax && job.connectPrice > connectRangeMax) return false;

      // 7. Client filters
      const client = job.client;
      // dollarSpent
      if (dollarSpentMin && client.totalSpent < dollarSpentMin) return false;
      if (dollarSpentMax && client.totalSpent > dollarSpentMax) return false;
      // hires
      if (hiresMin && client.totalHires < hiresMin) return false;
      if (hiresMax && client.totalHires > hiresMax) return false;

      // reviews
      if (reviewsCountMin && client.totalFeedback < reviewsCountMin)
        return false;
      if (reviewsCountMax && client.totalFeedback > reviewsCountMax)
        return false;

      // 10. Proposals
      if (proposalsMin && parseInt(job.proposalsTier) < proposalsMin)
        return false;
      if (proposalsMax && parseInt(job.proposalsTier) > proposalsMax)
        return false;

      // 11. Hourly range
      if (job.type === 2) {
        if (hourlyMin && job.hourlyBudget?.min < hourlyMin) return false;
        if (hourlyMax && job.hourlyBudget?.max > hourlyMax) return false;
      }

      // 12. Country filter
      // If 'isInclude' is true => include jobs only from the countries in listOfCountries
      // If 'isInclude' is false => exclude jobs that are in listOfCountries
      if (listOfCountries.length > 0) {
        const country = client.location?.country;
        if (isInclude) {
          // If country isn't in the list, hide this job
          if (!listOfCountries.includes(country)) return false;
        } else {
          // If country is in the list, hide this job
          if (listOfCountries.includes(country)) return false;
        }
      }

      return true;
    });
  }, [jobs, filters, hiddenJobs]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      <div className="max-h-dvh overflow-auto p-3 w-96 shadow">
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

      <div className="w-[calc(100%-384px)] max-h-dvh overflow-auto">
        <FilteredJobsList
          hiddenJobs={hiddenJobs}
          setHiddenJobs={setHiddenJobs}
          filteredJobs={filteredJobs}
          storeOldJob={storeOldJob}
          restoreOldJobs={restoreOldJobs}
          hideOldJobs={filters.hideOldJobs}
        />
      </div>
    </div>
  );
}
