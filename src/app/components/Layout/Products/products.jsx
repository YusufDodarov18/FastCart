import { memo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InnerProducts from "../../ui/innerProducts";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Products({ products, start, limit, query }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [ratings, setRatings] = useState({});

  const sortedProducts = [...products].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  useEffect(() => {
    if (products.length) {
      const obj = {};
      products.forEach((p) => {
        obj[p.id] = Math.floor(Math.random() * 5) + 1;
      });
      setRatings(obj);
    }
  }, [products]);

  return (
    <div>
      <Box className="flex justify-center gap-4 pl-20">
        {sortedProducts.length > 0 ? (
          sortedProducts.slice(start, start + limit).map((el, i) => {
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
          <Box>
            <Typography color="error" variant="h6">
              Not found: {query}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default memo(Products);
