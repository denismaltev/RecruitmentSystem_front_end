import React from "react";

const Weekdays = props => {
  const disabled = props.onDayCheck ? false : true;
  return (
    <span className="weekDays-selector">
      <input
        type="checkbox"
        id="weekday-mon"
        className="weekday"
        disabled={disabled}
        checked={props.days.mon}
        onChange={() => props.onDayCheck && props.onDayCheck("monday")}
      />
      <label htmlFor="weekday-mon">mon</label>
      <input
        type="checkbox"
        id="weekday-tue"
        className="weekday"
        disabled={disabled}
        checked={props.days.tue}
        onChange={() => props.onDayCheck && props.onDayCheck("tuesday")}
      />
      <label htmlFor="weekday-tue">tue</label>
      <input
        type="checkbox"
        id="weekday-wed"
        className="weekday"
        disabled={disabled}
        checked={props.days.wed}
        onChange={() => props.onDayCheck && props.onDayCheck("wednesday")}
      />
      <label htmlFor="weekday-wed">wed</label>
      <input
        type="checkbox"
        id="weekday-thu"
        className="weekday"
        disabled={disabled}
        checked={props.days.thu}
        onChange={() => props.onDayCheck && props.onDayCheck("thursday")}
      />
      <label htmlFor="weekday-thu">thu</label>
      <input
        type="checkbox"
        id="weekday-fri"
        className="weekday"
        disabled={disabled}
        checked={props.days.fri}
        onChange={() => props.onDayCheck && props.onDayCheck("friday")}
      />
      <label htmlFor="weekday-fri">fri</label>
      <input
        type="checkbox"
        id="weekday-sat"
        className="weekday"
        disabled={disabled}
        checked={props.days.sat}
        onChange={() => props.onDayCheck && props.onDayCheck("saturday")}
      />
      <label htmlFor="weekday-sat">sat</label>
      <input
        type="checkbox"
        id="weekday-sun"
        className="weekday"
        disabled={disabled}
        checked={props.days.sun}
        onChange={() => props.onDayCheck && props.onDayCheck("sunday")}
      />
      <label htmlFor="weekday-sun">sun</label>
    </span>
  );
};

export default Weekdays;
