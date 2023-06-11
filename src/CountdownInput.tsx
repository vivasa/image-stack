// CountdownInput.tsx
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CountdownInputProps {
  countdown: number;
  setCountdown: (value: number) => void;
}

const CountdownInput: React.FC<CountdownInputProps> = ({ countdown, setCountdown }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCountdown(value * 60); // converting minutes to seconds
  }

  const percentage = (countdown / (6 * 60)) * 100; // convert to percentage

  return (
    <div className="flex items-center">
      <CircularProgressbar 
        value={percentage} 
        text={`${Math.floor(countdown / 60)} min`} 
        styles={buildStyles({
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: '#000',
        })}
      />
      <input 
        type="range" 
        min="0.5" 
        max="6" 
        step="0.5" 
        value={countdown / 60} 
        onChange={handleChange} 
      />
    </div>
  )
};

export default CountdownInput;
