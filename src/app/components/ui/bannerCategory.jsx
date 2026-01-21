import { useEffect, useState } from "react";
import makn from "../../others/svg/makn.svg";
const BannerCategory = () => {
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
    <div>
      <div className="flex flex-col md:flex-row bg-black justify-center items-center gap-10 md:gap-[150px] p-6 md:p-15">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <p className="text-[#00FF66] text-lg font-semibold">Categories</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-lg">
            Enhance Your <br /> Music Experience
          </h1>

          <div className="flex justify-center md:justify-start gap-3">
            {Object.entries(time).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg">
                  <span className="text-xl md:text-2xl font-bold text-gray-800">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-gray-300 mt-2 text-sm capitalize">{unit}</p>
              </div>
            ))}
          </div>

          <button className="bg-[#00FF66] hover:bg-[#00E65C] text-black font-bold py-2 px-6 md:py-3 md:px-8 rounded-md w-fit mx-auto md:mx-0 transition-colors">
            Buy Now!
          </button>
        </div>

        <img
          src={makn}
          alt="Premium Headphones"
          className="max-w-xs md:max-w-md mt-6 md:mt-0"
        />
      </div>
    </div>
  );
};

export default BannerCategory;
