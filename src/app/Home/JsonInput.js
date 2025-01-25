import React from "react";

export default function JsonInput({ jsonInput, setJsonInput, onParseJson }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">1. Paste Job Postings JSON</h2>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded"
        placeholder="Paste an array of job objects here..."
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button
        onClick={onParseJson}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Parse JSON
      </button>
    </div>
  );
}
