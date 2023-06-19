import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import clsx from 'clsx';

interface CountdownInputProps {
  countdown: number;
  setCountdown: (value: number) => void;
  className?: string;
}

const CountdownInput: React.FC<CountdownInputProps> = ({ countdown, setCountdown, className }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCountdown(value * 60); // converting minutes to seconds
  }

  const percentage = (countdown / (6 * 60)) * 100; // convert to percentage

  return (
    <div className={clsx("flex items-center w-full space-x-5 p-5 bg-gray-100 rounded-lg shadow-md", className)}>
      <div style={{width: 80, height: 80}}> {/* Adjust size here */}
        <CircularProgressbar 
          value={percentage} 
          text={`${Math.floor(countdown / 60)} min`} 
          styles={buildStyles({
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: '#000',
            trailColor: '#ddd',
            backgroundColor: '#fff',
          })}
        />
      </div>
      <input 
        type="range" 
        className="slider flex-grow appearance-none bg-purple-500 height-1 rounded-full cursor-pointer"
        min={30 / 60} // 30 seconds
        max={360 / 60} // 360 seconds
        step={1 / 60} // 1 second
        value={countdown / 60} 
        onChange={handleChange} 
      />
    </div>
  )
};

export default CountdownInput;
