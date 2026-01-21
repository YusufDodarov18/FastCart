import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import { getCategories } from "../../../../provider/reducer/Categories/categories";
import { getProducts } from "../../../../provider/reducer/Products/products";
import useTheme from "../../../others/theme/theme-context";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import InnerProducts from "../../ui/innerProducts";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Categorias() {
  const { theme } = useTheme();
  const category = useSelector((store) => store.category.categories);
  const products = useSelector((store) => store.products.products);
  const dispatch = useDispatch();
  const [start, setStart] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ratings, setRatings] = useState({});
  const limit = 7;

  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (products.length) {
      const obj = {};
      products.forEach((p) => {
        obj[p.id] = Math.floor(Math.random() * 5) + 1;
      });
      setRatings(obj);
    }
  }, [products]);

  const next = () => {
    if (start + limit <= category.length) {
      setStart((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (start > 0) {
      setStart((prev) => prev - 1);
    }
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  const filterProductsByCategory = selectedCategory
    ? products.filter((prod) => prod.category == selectedCategory)
    : products;

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row gap-[10px] items-center mb-6">
        <div className="border-[#DB4444] border-[1px] bg-[#DB4444] w-[20px] h-[40px] rounded-md shadow-md" />
        <h1 className="text-[#DB4444] text-[20px] font-semibold">Categories</h1>
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <h1 className="w-[180px] md:w-auto text-[36px] font-bold mb-6">
          Browse By Category
        </h1>
        <Box className="flex">
          <Button onClick={prev} disabled={start == 0}>
            <ArrowLeft />
          </Button>
          <Button onClick={next} disabled={start + limit > category.length}>
            <ArrowRight />
          </Button>
        </Box>
      </div>
      <div className="flex justify-center gap-6">
        {category.slice(start, start + limit).map((el) => {
          const isActive = selectedCategory == el.categoryName;
          return (
            <div
              key={el.id}
              onClick={() => setSelectedCategory(el.categoryName)}
              className={`min-w-[150px] flex-shrink-0 group cursor-pointer border rounded-xl ${theme ? "border-gray-300 bg-gray-800" : "border-gray-600 bg-white"} flex flex-col items-center justify-center gap-3 p-3 text-center shadow-md hover:bg-[#f88585] hover:text-white transition-all duration-300`}
              style={{
                backgroundColor: isActive ? "#db4444" : "",
                color: isActive ? "white" : "",
              }}
            >
              <img
                src={el.image}
                alt={el.categoryName}
                className="w-16 h-16 object-contain transition-all duration-300 group-hover:invert"
              />
              <h1 className="text-[18px] font-semibold">{el.categoryName}</h1>
            </div>
          );
        })}
      </div>
      <Box className="flex justify-between items-center">
        <h1 className="w-[180px] md:w-auto text-[20px] font-bold mb-6 mt-10">
          Products by category.
        </h1>
        <Button
          variant="contained"
          onClick={() => setSelectedCategory(null)}
          sx={{ backgroundColor: "#DB4444" }}
        >
          All Categories
        </Button>
      </Box>
      <Box className="flex gap-6 flex-wrap justify-center">
        {filterProductsByCategory?.length > 0 ? (
          filterProductsByCategory.map((el, i) => {
            const isHovered = hoveredId === el.id;
            return (
              <Link to={`/product/get-product-by-id/${el.id}`}>
                <InnerProducts
                  el={el}
                  setHoveredId={setHoveredId}
                  isHovered={isHovered}
                  ratings={ratings}
                  i={i}
                />
              </Link>
            );
          })
        ) : (
          <Typography variant="h6">
            No products were found in this category.
          </Typography>
        )}
      </Box>
    </div>
  );
}
export default memo(Categorias);
