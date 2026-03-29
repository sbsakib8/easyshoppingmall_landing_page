"use client";

import { useEffect, useState } from "react";

export default function StatsCounter({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
      {stats.map((stat, i) => (
        <Counter key={i} stat={stat} />
      ))}
    </div>
  );
}

function Counter({ stat }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 2500; // ২.৫ সেকেন্ড (প্রিমিয়াম ফিলের জন্য পারফেক্ট)
    const endValue = stat.target;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;

      // Ease-out cubic formula: (1 - Math.pow(1 - progress, 3))
      // এটি শুরুতে দ্রুত এবং শেষের দিকে ধীরে এনিমেশন শেষ করে
      const progress = Math.min(elapsedTime / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      const currentCount = easeOutProgress * endValue;
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [stat.target]);

  // ফরম্যাটিং লজিক
  const displayValue = stat.decimal
    ? count.toFixed(stat.decimal)
    : Math.floor(count / (stat.divisor || 1));

  return (
    <div className="flex flex-col items-start lg:items-center">
      <p className="text-2xl md:text-3xl font-black text-accent-content tracking-tight">
        {displayValue}
        <span className="text-primary-color ml-0.5">{stat.suffix}</span>
      </p>
      <p className="text-gray-500 text-[10px] md:text-xs uppercase font-bold tracking-widest mt-1">
        {stat.label}
      </p>
    </div>
  );
}