import af from "../../app/others/svg/afg.svg";
import StatsSection from "../../app/components/ui/status";
import men from "../../app/others/svg/men.svg";
import girl from "../../app/others/svg/girl.svg";
import gent from "../../app/others/svg/gent.svg";
import { Carousel } from "antd";
import useTheme from "../../app/others/theme/theme-context";

const data = [
  { name: "Tom Cruise", job: "Founder & Chairman", img: men, id: 1 },
  { name: "Emma Watson", job: "Managing Director", img: girl, id: 2 },
  { name: "Will Smith", job: "Product Designer", img: gent, id: 3 },
  { name: "John Doe", job: "Marketing Director", img: men, id: 4 },
  { name: "Jane Smith", job: "CTO", img: girl, id: 5 },
  { name: "Michael Johnson", job: "CFO", img: gent, id: 6 },
  { name: "Sarah Williams", job: "HR Manager", img: men, id: 7 },
  { name: "David Brown", job: "Sales Director", img: girl, id: 8 },
  { name: "Lisa Davis", job: "Customer Support", img: gent, id: 9 },
];

function About() {
  const { theme } = useTheme();
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Story</h1>
          <div className={`space-y-6`}>
            <p className="text-lg leading-relaxed">
              Launched in 2015, Exclusive is South Asia's premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 million customers across the region.
            </p>
            <p className="text-lg leading-relaxed">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast pace. Exclusive offers a diverse assortment in
              categories ranging from consumer.
            </p>
          </div>
        </div>

        <div className="md:w-1/2">
          <img
            src={af}
            alt="Online Shopping"
            className="w-full h-auto rounded-lg shadow-xl object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <StatsSection />
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Our Team
        </h2>
        <Carousel
          autoplay
          autoplaySpeed={3000}
          dots={true}
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
          className="team-carousel"
        >
          {data.map((member) => (
            <div key={member.id} className="px-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-[#DB4444]">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-[#DB4444] dark:text-[#ff6b6b]">
                  {member.job}
                </p>
                <div className="flex justify-center mt-4 space-x-3">
                  <button className="text-gray-500 hover:text-[#DB4444] dark:hover:text-[#ff6b6b]">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-[#DB4444] dark:hover:text-[#ff6b6b]">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-[#DB4444] dark:hover:text-[#ff6b6b]">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default About;
