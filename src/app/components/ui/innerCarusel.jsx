const InnerCarousel = ({ icon, title, subtitle, imgSrc }) => {
  return (
      <div className="bg-black !flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-10 w-full h-[400px] shadow-lg gap-6">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div className="flex gap-3 items-center justify-center md:justify-start">
              {icon}
              <p className="text-gray-200 text-base md:text-lg tracking-wide">{title}</p>
            </div>
            <h1 className="text-white font-bold text-3xl md:text-5xl leading-tight max-w-sm mx-auto md:mx-0">{subtitle}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer w-fit mx-auto md:mx-0">
              <p className="text-white text-base md:text-lg border-b border-white group-hover:border-blue-400 transition">Shop Now</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
            </div>
          </div>
          <img src={imgSrc} alt={title} className="w-70 object-contain drop-shadow-2xl"/>
      </div>
  );
};

export default InnerCarousel;
