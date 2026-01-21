import social2 from "../../../others/svg/social2.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-rose-600">Exclusive</h1>
          <h2 className="text-lg font-semibold text-white">Subscribe</h2>
          <p className="text-sm">Get 10% off your first order</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 px-4 py-2 ml-[-3px] text-sm rounded-l-md focus:outline-none focus:ring-[1px] focus:ring-rose-600 w-full"
            />
            <button className="bg-rose-600 text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Support</h2>
          <address className="text-sm not-italic">
            III Bijoy Karam, Dhaka, DH Eltis, Bangladesh
          </address>
          <div className="space-y-1">
            <p className="text-sm">exclusive@gmail.com</p>
            <p className="text-sm">+88018-88888-9989</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Account</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm hover:text-rose-500 cursor-pointer transition">
                My Account
              </p>
              <p className="text-sm hover:text-rose-500 cursor-pointer transition">
                Cart
              </p>
              <p className="text-sm hover:text-rose-500 cursor-pointer transition">
                Wishlist
              </p>
              <p className="text-sm hover:text-rose-500 cursor-pointer transition">
                Shop
              </p>
            </div>
            <div className="space-y-2 mt-[-42px]">
              <h2 className="text-lg font-semibold text-white">Quick Links</h2>
              <p className="text-sm hover:text-rose-500 cursor-pointer transition">
                Privacy Policy
              </p>
              <p className="text-sm hover:text-rose-500 cursor-pointer transition">
                Terms Of Use
              </p>
              <p className="text-sm hover:text-rose-500 cursor-pointer transition">
                FAQ
              </p>
              <p className="text-sm hover:text-rose-500 cursor-pointer transition">
                Contact
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Social</h2>
          <img src={social2} alt="Internet Magazin" />
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-sm">
        <p>© Copyright Rimel 2022. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
