import { ChangeEvent, useState, KeyboardEvent, useRef, useEffect } from "react";

interface OTPProps {
  length?: number;
}

const OTP = ({ length = 4 }: OTPProps) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);

  const handleChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
    ({ idx, e });
    console.log("otp:", otp);
  };

  const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    const key = Number(e.key);
    if (key >= 0 || key <= 9) {
      setOtp((prev) => {
        prev[idx] = e.key;
        return [...prev];
      });
      if (idx < length - 1) {
        inputRefs.current[idx + 1]?.focus();
      } else {
        inputRefs.current[idx]?.blur();
      }
    } else if (e.key === "Backspace") {
      setOtp((prev) => {
        prev[idx] = "";
        return [...prev];
      });
    }
  };

  const handleClick = (idx: number) => {
    const currentInput = inputRefs.current[idx];
    if (currentInput) {
      currentInput.setSelectionRange(1, 1);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex items-center gap-8">
      {otp.map((value, idx) => (
        <input
          key={idx}
          ref={(input) => (inputRefs.current[idx] = input)}
          value={value}
          type="text"
          onChange={(e) => handleChange(idx, e)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onClick={() => handleClick(idx)}
          className="h-20 w-20 bg-[#555] rounded-lg border-none ring-none outline-none focus:ring-2 focus:ring-green-300 text-center text-[2rem] transition-all"
        />
      ))}
    </div>
  );
};

export default OTP;
