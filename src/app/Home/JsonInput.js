import React from "react";

export default function JsonInput({ jsonInput, setJsonInput, onParseJson }) {
  return (
    <div className="mb-4 flex">
      <textarea
        className="w-full text-sm p-2 border border-gray-300 rounded resize-none outline-none"
        placeholder="Paste JSON here..."
        rows={1}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button
        onClick={onParseJson}
        className="ml-2 px-4 py-1 bg-blue-600 text-white rounded text-sm font-semibold"
      >
        Parse
      </button>
    </div>
  );
}
