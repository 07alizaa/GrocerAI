import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

const AnimatedCounter = ({ end, suffix = "", duration = 2000, delay = 0, className = "" }) => {
  // Parse the number from string (e.g., "50K+" -> 50)
  const parseNumber = (value) => {
    const numStr = value.toString().replace(/[^\d.]/g, '');
    return parseFloat(numStr) || 0;
  };

  // Get the suffix from the original value (e.g., "50K+" -> "K+")
  const getSuffix = (value) => {
    const match = value.toString().match(/[^\d.]+/);
    return match ? match[0] : suffix;
  };

  const targetNumber = parseNumber(end);
  const displaySuffix = getSuffix(end);
  const [count, ref] = useCountUp(targetNumber, duration, delay);

  // Format the number for display
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const displayValue = displaySuffix.includes('K') || displaySuffix.includes('M') 
    ? formatNumber(count) + displaySuffix.replace(/[KM]/g, '')
    : count + displaySuffix;

  return (
    <div ref={ref} className={className}>
      {displayValue}
    </div>
  );
};

export default AnimatedCounter;
