import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CountdownInputProps {
  countdown: number;
  setCountdown: (value: number) => void;
  className?: string; // add this line
}

const CountdownInput: React.FC<CountdownInputProps> = ({ countdown, setCountdown, className }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCountdown(value * 60); // converting minutes to seconds
  }

  const percentage = (countdown / (6 * 60)) * 100; // convert to percentage

  return (
    <div className={`flex items-center w-full ${className}`}>
      <div style={{width: "5%", height: "5%"}}> {/* Adjust size here */}
        <CircularProgressbar 
          value={percentage} 
          text={`${Math.floor(countdown / 60)} min`} 
          styles={buildStyles({
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: '#000',
          })}
        />
      </div>
      <input 
        type="range" 
        className="flex-grow" // Add this class
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
