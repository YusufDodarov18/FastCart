import { useEffect, useState } from "react";
import { useTheme } from "../../app/others/theme/theme-context";
import Box from "@mui/material/Box";
import CarouselMenu from "../../app/components/Layout/Carusel/Carusel";
import Time from "../../app/components/ui/time";
import Button from "@mui/material/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Products from "../../app/components/Layout/Products/products";
import Categorias from "../../app/components/Layout/Categories/category";
import BannerCategory from "../../app/components/ui/bannerCategory";
import Arrival from "../../app/components/Layout/Arrival/arrival";
import Features from "../../app/components/Layout/Features/features";
import AllProducts from "../../app/components/Layout/AllProducts/allProducts";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../provider/reducer/Products/products";
import Loading from "../../app/components/Layout/Loading/Loading";
import { setSearchQuery } from "../../provider/reducer/Search/search";
import SearchProducts from "../../app/components/ui/search";

export default function Home() {
  const { theme } = useTheme();
  const [start, setStart] = useState(0);
  const limit = 6;
  const products = useSelector((store) => store.products.products);
  const query = useSelector((store) => store.searchProducts.query);

  const filterProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(query?.toLowerCase().trim()),
  );

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const next = () => {
    if (start + limit <= products.length) {
      setStart((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (start > 0) {
      setStart((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getProducts()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box className="pb-20 pt-10">
      <SearchProducts query={query} setSearchQuery={setSearchQuery} />
      <Box className="md:flex block gap-10 items-center">
        <Box className="flex md:flex-col flex-wrap gap-3 py-6 border-r-0 md:border-r-2 pr-6">
          {[
            "Woman's Fashion",
            "Men's Fashion",
            "Electronics",
            "Home & Lifestyle",
            "Medicine",
            "Sports & Outdoor",
            "Baby's & Toys",
            "Groceries & Pets",
            "Health & Beauty",
          ].map((item, i) => (
            <p
              key={i}
              className={`relative text-[16px] cursor-pointer px-4 py-2 rounded-md transition-all duration-200 ${theme ? "bg-gray-800 text-white dark:hover:bg-blue-900 hover:text-blue-400 " : "bg-gray-100 text-black hover:bg-blue-100 hover:text-blue-600"} flex items-center justify-between`}
            >
              {item}
              {(i === 0 || i === 1) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mt-[2px] ml-[3px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              )}
            </p>
          ))}
        </Box>
        <Box className="w-full md:w-[70%]">
          <CarouselMenu />
        </Box>
      </Box>
      <Box className="flex justify-between px-10 pt-20 items-center flex-col md:flex-row">
        <Time />
        <Box className="flex">
          <Button onClick={prev} disabled={start === 0}>
            <ArrowLeft />
          </Button>
          <Button onClick={next} disabled={start + limit > products.length}>
            <ArrowRight />
          </Button>
        </Box>
      </Box>
      <Box className="flex justify-center px-10 pt-5 pb-3">
        <Products
          products={filterProducts}
          start={start}
          query={query}
          limit={limit}
        />
      </Box>
      <Box className="px-10 pt-20">
        <Categorias />
      </Box>
      <BannerCategory />
      <Box className="py-12">
        <AllProducts />
      </Box>
      <Arrival />
      <Features />
    </Box>
  );
}
