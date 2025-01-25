import React, { useState } from "react";
import Select from "react-select";
import { Switch } from "@headlessui/react";
import { countryOptions } from "./countryList";

export default function FiltersPanel({ filters, updateFilter, onSaveFilters }) {
  const [isInclude, setIsInclude] = useState(true);

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

    reviewsCountMin,
    reviewsCountMax,

    proposalsMin,
    proposalsMax,

    hourlyMin,
    hourlyMax,
  } = filters;

  // Handle country selection
  const handleCountryChange = (selectedOptions) => {
    const selectedCountries = selectedOptions.map((option) => option.value);
    if (isInclude) {
      updateFilter("includeLocations", selectedCountries);
    } else {
      updateFilter("excludeLocations", selectedCountries);
    }
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
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 font-medium">Hide Jobs</span>
        <Switch
          checked={hideOldJobs}
          onChange={() => updateFilter("hideOldJobs", !hideOldJobs)}
          className={`${
            hideOldJobs ? "bg-blue-600" : "bg-red-600"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              hideOldJobs ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>
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

        {/* Country Include/Exclude Toggle */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Country Filter</label>
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-700 font-medium">
              {isInclude ? "Include" : "Exclude"}
            </span>
            <Switch
              checked={isInclude}
              onChange={setIsInclude}
              className={`${
                isInclude ? "bg-blue-600" : "bg-red-600"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  isInclude ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>
        </div>

        {/* Country Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            {isInclude ? "Include Countries" : "Exclude Countries"}
          </label>
          <Select
            options={countryOptions}
            isMulti
            className="border border-gray-300 rounded"
            placeholder="Select countries..."
            onChange={handleCountryChange}
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
