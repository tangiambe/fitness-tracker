import React, { useState, useEffect } from 'react';

function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <span>{formattedDateTime}</span>
  );
}

export default DateTimeDisplay;