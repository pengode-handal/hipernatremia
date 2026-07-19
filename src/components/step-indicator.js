const colors = {
  done: "#22c55e",
  current: "#60a5fa",
  upcoming: "#ef4444",
};

export default function StepIndicator({ className = "", current = 1, total = 22 }) {
  return (
    <div className={`flex w-full items-center justify-center px-1 ${className}`}>
      {Array.from({ length: total }).map((_, index) => {
        const step = index + 1;
        const isDone = step < current;
        const isCurrent = step === current;
        const dotColor = isDone
          ? colors.done
          : isCurrent
            ? colors.current
            : colors.upcoming;
        const lineColor = step < current ? colors.done : colors.upcoming;

        return (
          <div
            className={`flex items-center ${index === total - 1 ? "" : "flex-1"}`}
            key={index}
          >
            <span
              className="step-indicator-dot h-[14px] w-[14px] shrink-0 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
            {index < total - 1 ? (
              <span
                className="step-indicator-line h-[3px] flex-1"
                style={{ backgroundColor: lineColor }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
