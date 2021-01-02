import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export default function Footer() {
  const theme = {
    backgroundColor: "bg-gray-200"
  };

  function getTime() {
    return format(Date.now(), "eee LLL d pp");
  }

  const [time, updateTime] = useState(getTime);

  useEffect(() => {
    const timer = setInterval(() => {
      updateTime(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div className={`p-6 text-sm ${theme.backgroundColor}`}>{time}</div>;
}
