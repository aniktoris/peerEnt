import React, { useState } from "react";
import PropTypes from "prop-types";
import "./rentStyle.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({
  handleStartDateChange,
  handleEndDateChange,
  unavailableDates,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateInput = (date) => {
    date.setHours(0, 0, 0, 0);
    setStartDate(date);
    handleStartDateChange(date);
  };

  const handleEndDateInput = (date) => {
    date.setHours(23, 59, 59, 999);
    setEndDate(date);
    handleEndDateChange(date);
  };

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleStartDateInput(date)}
          excludeDates={unavailableDates}
          minDate={new Date()}
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => handleEndDateInput(date)}
          excludeDates={unavailableDates}
          minDate={new Date()}
        />
      </div>
    </div>
  );
};
InputDate.propTypes = {
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  unavailableDates: PropTypes.array.isRequired,
};
export default InputDate;
