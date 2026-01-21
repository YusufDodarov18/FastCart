import Box from "@mui/material/Box";
import InnerProducts from "../../ui/innerProducts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../provider/reducer/Products/products";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function AllProducts() {
  const [hoveredId, setHoveredId] = useState(null);

  const [ratings, setRatings] = useState({});

  const products = useSelector((store) => store.products.products);
  const dispatch = useDispatch();
  const query = useSelector((store) => store.searchProducts.query);

  const filterProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(query?.toLowerCase().trim()),
  );

  useEffect(() => {
    if (products.length) {
      const obj = {};
      products.forEach((p) => {
        obj[p.id] = Math.floor(Math.random() * 5) + 1;
      });
      setRatings(obj);
    }
  }, [products]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Box className="flex flex-col px-10">
      <div className="flex flex-col md:flex-row gap-[10px] items-center mb-6">
        <div className="border-[#DB4444] border-[1px] bg-[#DB4444] w-[20px] h-[40px] rounded-md shadow-md" />
        <h1 className="text-[#DB4444] text-[20px] font-semibold">
          Our Products
        </h1>
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <h1 className="w-[180px] md:w-auto text-[36px] font-bold mb-6">
          Explore Our Products
        </h1>
      </div>
      <Box className="flex gap-6 flex-wrap justify-center">
        {filterProducts.length > 0 ? (
          filterProducts.map((el) => {
            const isHovered = hoveredId === el.id;
            return (
              <Link to={`/product/get-product-by-id/${el.id}`}>
                <InnerProducts
                  el={el}
                  setHoveredId={setHoveredId}
                  isHovered={isHovered}
                  ratings={ratings}
                />
              </Link>
            );
          })
        ) : (
          <Box>
            <Typography color="error" variant="h6">Not found: {query}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
