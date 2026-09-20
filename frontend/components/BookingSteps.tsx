import React from "react";

const steps = ["Select Time", "Review Booking", "Payment", "Confirmation"];

export default function BookingSteps({ current }: { current: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === current;
        const isDone = stepNumber < current;
        return (
          <div key={step} className="space-y-2">
            <div
              className={`h-1 rounded-full ${
                isDone || isActive ? "bg-[#063C2F]" : "bg-[#E7E5DE]"
              }`}
            />
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  isActive
                    ? "bg-[#063C2F] text-white"
                    : isDone
                    ? "bg-[#E8F0ED] text-[#063C2F]"
                    : "bg-[#F4F3EF] text-[#777C78]"
                }`}
              >
                {stepNumber}
              </span>
              <span className={isActive ? "font-semibold text-[#111512]" : "text-[#555A56]"}>
                {step}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

