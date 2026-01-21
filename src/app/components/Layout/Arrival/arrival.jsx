import ps5 from "../../../others/svg/ps5.svg";
import wemen from "../../../others/svg/wemen.svg";
import speakers from "../../../others/svg/speakers.svg";
import perfume from "../../../others/svg/perfume.svg";

const Arrival = () => {
  return (
    <div className="mt-[80px] px-4 sm:px-6 lg:px-8">
      <div className="flex gap-[10px] items-center mb-6">
        <div className="border-[#DB4444] border-[1px] bg-[#DB4444] w-[20px] h-[40px] rounded-md shadow-md" />
        <h1 className="text-[#DB4444] text-[20px] font-semibold">Featured</h1>
      </div>

      <h1 className="text-[36px] font-bold dark:text-white mb-6">
        New Arrival
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
        <div
          className="bg-gray-200 rounded-md p-8 h-[280px] md:h-[600px] flex flex-col justify-end"
          style={{
            backgroundImage: `url(${ps5})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">PlayStation 5</h1>
            <p className="mb-4">
              Black and White version of the PS5 coming out on sale.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer w-fit mx-auto md:mx-0">
              <p className="text-white text-base md:text-lg border-b border-white group-hover:border-blue-400 transition">
                Shop Now
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[39px]">
          <div
            className="bg-gray-300 rounded-md p-8 h-[280px] flex flex-col justify-end"
            style={{
              backgroundImage: `url(${wemen})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-2">Women's Collections</h1>
              <p className="mb-4">
                Featured women collections that give you another vibe.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer w-fit mx-auto md:mx-0">
                <p className="text-white text-base md:text-lg border-b border-white group-hover:border-blue-400 transition">
                  Shop Now
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="bg-gray-400 rounded-md p-8 h-[280px] flex flex-col justify-end"
              style={{
                backgroundImage: `url(${speakers})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-white">
                <h1 className="text-xl font-bold mb-2">Speakers</h1>
                <p className="mb-4">Armoured wireless speakers</p>
                <div className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer w-fit mx-auto md:mx-0">
                  <p className="text-white text-base md:text-lg border-b border-white group-hover:border-blue-400 transition">
                    Shop Now
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className="bg-gray-500 rounded-md p-8 h-[280px] flex flex-col justify-end"
              style={{
                backgroundImage: `url(${perfume})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-white">
                <h1 className="text-xl font-bold mb-2">Perfume</h1>
                <p className="mb-4">BICC IN USES CLUB!</p>
                <div className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer w-fit mx-auto md:mx-0">
                  <p className="text-white text-base md:text-lg border-b border-white group-hover:border-blue-400 transition">
                    Shop Now
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arrival;
