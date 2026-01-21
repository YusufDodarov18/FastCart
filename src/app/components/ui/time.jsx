import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

function Time() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  let deadline = localStorage.getItem("countdownDeadline");
  deadline = Number(deadline);

  const now = Date.now();
  const distance = deadline - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  useEffect(() => {
    const COUNTDOWN_DAYS = 10;

    let deadline = localStorage.getItem("countdownDeadline");

    if (!deadline) {
      const newDeadline =
        new Date().getTime() + COUNTDOWN_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem("countdownDeadline", newDeadline);
      deadline = newDeadline;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        localStorage.removeItem("countdownDeadline");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <Box>
      <Box className="flex gap-[10px] items-center mb-6">
        <Box className="border-[#DB4444] border-[1px] bg-[#DB4444] w-[20px] h-[40px] rounded-md shadow-md" />
        <h1 className="text-[#DB4444] text-[20px] font-semibold">Today’s</h1>
      </Box>

      <Box className="flex items-center gap-[80px] mb-6">
        <h1 className="text-[28px] md:text-[36px] font-bold">Flash Sales</h1>
        <Box className="flex gap-5 flex-col md:flex-row">
          <Box>
            <p className="text-[12px] font-bold">Days</p>
            <Box className="flex items-center gap-4">
              <h1 className="font-bold text-3xl">
                {days < 10 ? `0${days}` : days}
              </h1>
              <p className="font-bold text-[#DB4444]">:</p>
            </Box>
          </Box>
          <Box>
            <p className="text-[12px] font-bold">Hours</p>
            <Box className="flex items-center gap-4">
              <h1 className="font-bold text-3xl ">
                {hours < 10 ? `0${hours}` : hours}
              </h1>
              <p className="font-bold text-[#DB4444]">:</p>
            </Box>
          </Box>
          <Box>
            <p className="text-[12px] font-bold">Minutes</p>
            <Box className="flex items-center gap-4">
              <h1 className="font-bold text-3xl ">
                {minutes < 10 ? `0${minutes}` : minutes}
              </h1>
              <p className="font-bold text-[#DB4444]">:</p>
            </Box>
          </Box>
          <Box>
            <p className="text-[12px] font-bold">Seconds</p>
            <Box className="flex items-center gap-4">
              <h1 className="font-bold text-3xl ">
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Time;
