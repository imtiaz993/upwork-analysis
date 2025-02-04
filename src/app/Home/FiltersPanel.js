import React, { useState } from "react";
import Select from "react-select";
import { Switch } from "@headlessui/react";
import { countryOptions } from "./countryList";
import {
  FaFilter,
  FaClock,
  FaDollarSign,
  FaLink,
  FaGlobe,
  FaSave,
  FaUsers,
  FaBriefcase,
  FaMoneyBillWave,
} from "react-icons/fa";
import InputField from "./components/InputField";
import RangeField from "./components/RangeField";

export default function FiltersPanel({ filters, updateFilter, onSaveFilters }) {
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

    isInclude,
    listOfCountries,
  } = filters;

  // Handle country selection
  const handleCountryChange = (selectedOptions) => {
    const selectedCountries = selectedOptions.map((option) => option.value);
    updateFilter("listOfCountries", selectedCountries);
  };

  return (
    <div className="mb-6 bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaFilter className="text-blue-600 w-4 h-4" /> Filters
        </h2>
        <button
          className="flex items-center gap-2 py-1.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={onSaveFilters}
        >
          <FaSave />
          <span>Save Filters</span>
        </button>
      </div>

      {/* Hide Read Jobs */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <span className="text-gray-700 font-medium flex items-center gap-2">
          <FaClock className="text-gray-600" />
          Hide Read Jobs
        </span>
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
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="paymentVerified"
          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          checked={paymentVerified}
          onChange={() => updateFilter("paymentVerified", !paymentVerified)}
        />
        <label htmlFor="paymentVerified" className="text-gray-700 font-medium">
          Payment Verified
        </label>
      </div>

      <div className="space-y-6">
        {/* Posted Time */}
        <InputField
          label="Posted within X hours"
          value={postedHours}
          placeholder="Hours"
          onChange={(value) => updateFilter("postedHours", value)}
          icon={<FaClock />}
        />

        {/* Budget Range */}
        <RangeField
          label="Budget Range (Fixed)"
          minValue={budgetMin}
          maxValue={budgetMax}
          onMinChange={(value) => updateFilter("budgetMin", value)}
          onMaxChange={(value) => updateFilter("budgetMax", value)}
          icon={<FaDollarSign />}
        />

        {/* Connect Range */}
        <RangeField
          label="Connect Range"
          minValue={connectRangeMin}
          maxValue={connectRangeMax}
          onMinChange={(value) => updateFilter("connectRangeMin", value)}
          onMaxChange={(value) => updateFilter("connectRangeMax", value)}
          icon={<FaLink />}
        />

        {/* Dollar Spent */}
        <RangeField
          label="Dollar Spent (Min - Max)"
          minValue={dollarSpentMin}
          maxValue={dollarSpentMax}
          onMinChange={(value) => updateFilter("dollarSpentMin", value)}
          onMaxChange={(value) => updateFilter("dollarSpentMax", value)}
          icon={<FaMoneyBillWave />}
        />

        {/* Hires */}
        <RangeField
          label="Hires (Min - Max)"
          minValue={hiresMin}
          maxValue={hiresMax}
          onMinChange={(value) => updateFilter("hiresMin", value)}
          onMaxChange={(value) => updateFilter("hiresMax", value)}
          icon={<FaBriefcase />}
        />

        {/* Proposals */}
        <RangeField
          label="Proposals (Min - Max)"
          minValue={proposalsMin}
          maxValue={proposalsMax}
          onMinChange={(value) => updateFilter("proposalsMin", value)}
          onMaxChange={(value) => updateFilter("proposalsMax", value)}
          icon={<FaUsers />}
        />

        {/* Hourly Rate */}
        <RangeField
          label="Hourly Rate (Min - Max)"
          minValue={hourlyMin}
          maxValue={hourlyMax}
          onMinChange={(value) => updateFilter("hourlyMin", value)}
          onMaxChange={(value) => updateFilter("hourlyMax", value)}
          icon={<FaDollarSign />}
        />

        {/* Country Filter */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-700 font-medium flex items-center gap-2">
              <FaGlobe className="text-gray-600" />
              Country ({isInclude ? "Included" : "Excluded"})
            </label>
            <Switch
              checked={isInclude}
              onChange={(e) => {
                updateFilter("isInclude", e);
              }}
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
          <Select
            options={countryOptions}
            isMulti
            value={listOfCountries.map((i) => ({ label: i, value: i }))}
            className="border border-gray-300 rounded w-full"
            placeholder={`${
              isInclude ? "Include Countries" : "Exclude Countries"
            }`}
            onChange={handleCountryChange}
          />
        </div>
      </div>
    </div>
  );
}
