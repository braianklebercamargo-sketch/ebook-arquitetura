import { useState, useEffect } from 'react';

export function CountdownTimer() {
  // Set initial 24 hours in seconds
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatUnit = (unit: number) => unit.toString().padStart(2, '0');

  return (
    <div className="flex gap-4 justify-center items-center my-6">
      <div className="flex flex-col items-center gap-2">
        <div className="timer-digit flex justify-center items-center p-3 sm:p-4 min-w-[4rem] sm:min-w-[5rem]">
          <span className="text-3xl sm:text-4xl font-mono text-[#D4AF37] font-bold">{formatUnit(hours)}</span>
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">Horas</span>
      </div>
      <span className="text-3xl sm:text-4xl font-bold text-[#D4AF37] animate-pulse pb-6">:</span>
      <div className="flex flex-col items-center gap-2">
        <div className="timer-digit flex justify-center items-center p-3 sm:p-4 min-w-[4rem] sm:min-w-[5rem]">
          <span className="text-3xl sm:text-4xl font-mono text-[#D4AF37] font-bold">{formatUnit(minutes)}</span>
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">Min</span>
      </div>
      <span className="text-3xl sm:text-4xl font-bold text-[#D4AF37] animate-pulse pb-6">:</span>
      <div className="flex flex-col items-center gap-2">
        <div className="timer-digit flex justify-center items-center p-3 sm:p-4 min-w-[4rem] sm:min-w-[5rem]">
          <span className="text-3xl sm:text-4xl font-mono text-[#D4AF37] font-bold">{formatUnit(seconds)}</span>
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">Seg</span>
      </div>
    </div>
  );
}
