import React from "react";

const Dropdown = ({ label, options, category }) => {
  // Create a unique ID based on the label
  const uniqueId = `dropdown-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="select relative">
      <select
        defaultValue={0}
        name={uniqueId}
        id={uniqueId}
        onChange={category}
      >
        <option value="0" disabled>
          {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
