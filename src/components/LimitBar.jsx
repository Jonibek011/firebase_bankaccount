import React, { memo } from "react";

const LimitBar = memo(function LimitBar() {
  return (
    <div className="w-full h-full p-4 rounded-xl bg-base-100">
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-semibold">This month</span> -{" "}
          <span className="btn btn-sm">$152.00</span>
        </div>
        <div>
          <span className="font-semibold">Total Spent</span> -{" "}
          <span className="btn btn-sm">$152.00</span>
        </div>
        <div>
          <span className="font-semibold">Highest expenses</span> -{" "}
          <span className="btn btn-sm">$152.00</span>
        </div>
      </div>
    </div>
  );
});

export default LimitBar;
