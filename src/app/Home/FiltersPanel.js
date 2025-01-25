import React, { useState } from "react";

export default function FiltersPanel({ filters, updateFilter, onSaveFilters }) {
  // We can still use local states for comma-separated fields (locations, skills)
  const [includeLocationsInput, setIncludeLocationsInput] = useState("");
  const [excludeLocationsInput, setExcludeLocationsInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");

  // For convenience, destructure the filters object
  const {
    hideOldJobs,
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
    includeLocations,
    excludeLocations,

    reviewsCountMin,
    reviewsCountMax,

    proposalsMin,
    proposalsMax,

    hourlyMin,
    hourlyMax,
  } = filters;

  // Handle updating locations on blur
  const handleIncludeLocationsBlur = () => {
    const list = includeLocationsInput
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    // Update the filter object with new array
    updateFilter("includeLocations", list);
  };

  const handleExcludeLocationsBlur = () => {
    const list = excludeLocationsInput
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    updateFilter("excludeLocations", list);
  };

  // Handle updating skills on blur
  const handleSkillsBlur = () => {
    const list = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    updateFilter("skillsFilter", list);
  };

  return (
    <div className="mb-6 bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button
          className="py-1.5 px-4 bg-blue-600 text-white rounded"
          onClick={onSaveFilters}
        >
          Save Filters
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="hideOldJobs"
          checked={hideOldJobs}
          onChange={() => updateFilter("hideOldJobs", !hideOldJobs)}
        />
        <label htmlFor="hideOldJobs">Don't Show Old Jobs</label>
      </div>
      {/* Payment Verified */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="paymentVerified"
          checked={paymentVerified}
          onChange={() => updateFilter("paymentVerified", !paymentVerified)}
        />
        <label htmlFor="paymentVerified">Payment Verified</label>
      </div>

      {/* Posted Time (hours) */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Posted within X hours:</label>
        <input
          type="number"
          className="border p-1 w-20"
          value={postedHours}
          onChange={(e) => updateFilter("postedHours", e.target.value)}
        />
      </div>

      {/* Budget Range (Fixed) */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Budget Range (Fixed):</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="border p-1 w-20"
            placeholder="Min"
            value={budgetMin}
            onChange={(e) => updateFilter("budgetMin", e.target.value)}
          />
          <input
            type="number"
            className="border p-1 w-20"
            placeholder="Max"
            value={budgetMax}
            onChange={(e) => updateFilter("budgetMax", e.target.value)}
          />
        </div>
      </div>

      {/* Connect Range */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Connect Range:</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="border p-1 w-20"
            placeholder="Min"
            value={connectRangeMin}
            onChange={(e) => updateFilter("connectRangeMin", e.target.value)}
          />
          <input
            type="number"
            className="border p-1 w-20"
            placeholder="Max"
            value={connectRangeMax}
            onChange={(e) => updateFilter("connectRangeMax", e.target.value)}
          />
        </div>
      </div>

      {/* Client Filters */}
      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2">Client Filters</h3>
        <div className="mb-2 flex flex-col gap-2">
          <div>
            <label className="block mb-1">Dollar Spent (Min - Max)</label>
            <div className="flex gap-2">
              <input
                type="number"
                className="border p-1 w-20"
                placeholder="Min"
                value={dollarSpentMin}
                onChange={(e) => updateFilter("dollarSpentMin", e.target.value)}
              />
              <input
                type="number"
                className="border p-1 w-20"
                placeholder="Max"
                value={dollarSpentMax}
                onChange={(e) => updateFilter("dollarSpentMax", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Hires (Min - Max)</label>
            <div className="flex gap-2">
              <input
                type="number"
                className="border p-1 w-20"
                placeholder="Min"
                value={hiresMin}
                onChange={(e) => updateFilter("hiresMin", e.target.value)}
              />
              <input
                type="number"
                className="border p-1 w-20"
                placeholder="Max"
                value={hiresMax}
                onChange={(e) => updateFilter("hiresMax", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mb-2">
          <label className="block mb-1">
            Include Locations (comma-separated):
          </label>
          <input
            type="text"
            className="border p-1 w-full"
            placeholder="e.g. United States, Czech Republic"
            value={includeLocationsInput}
            onChange={(e) => setIncludeLocationsInput(e.target.value)}
            onBlur={handleIncludeLocationsBlur}
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">
            Exclude Locations (comma-separated):
          </label>
          <input
            type="text"
            className="border p-1 w-full"
            placeholder="e.g. India, Russia"
            value={excludeLocationsInput}
            onChange={(e) => setExcludeLocationsInput(e.target.value)}
            onBlur={handleExcludeLocationsBlur}
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Reviews Count (Min - Max)</label>
          <div className="flex gap-2">
            <input
              type="number"
              className="border p-1 w-20"
              placeholder="Min"
              value={reviewsCountMin}
              onChange={(e) => updateFilter("reviewsCountMin", e.target.value)}
            />
            <input
              type="number"
              className="border p-1 w-20"
              placeholder="Max"
              value={reviewsCountMax}
              onChange={(e) => updateFilter("reviewsCountMax", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Skills Filter */}
      <div className="border-t pt-4 mt-4">
        <label className="block mb-1 font-medium">
          Skills (comma-separated):
        </label>
        <input
          type="text"
          className="border p-1 w-full"
          placeholder="e.g. React, CSS, HTML"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          onBlur={handleSkillsBlur}
        />
      </div>

      {/* Proposals */}
      <div className="mt-4">
        <label className="block mb-1 font-medium">
          Proposals Range (Min - Max)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            className="border p-1 w-20"
            placeholder="Min"
            value={proposalsMin}
            onChange={(e) => updateFilter("proposalsMin", e.target.value)}
          />
          <input
            type="number"
            className="border p-1 w-20"
            placeholder="Max"
            value={proposalsMax}
            onChange={(e) => updateFilter("proposalsMax", e.target.value)}
          />
        </div>
      </div>

      {/* Hourly Rate Range */}
      <div className="mt-4">
        <label className="block mb-1 font-medium">
          Hourly Rate (Min - Max)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            className="border p-1 w-20"
            placeholder="Min"
            value={hourlyMin}
            onChange={(e) => updateFilter("hourlyMin", e.target.value)}
          />
          <input
            type="number"
            className="border p-1 w-20"
            placeholder="Max"
            value={hourlyMax}
            onChange={(e) => updateFilter("hourlyMax", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
