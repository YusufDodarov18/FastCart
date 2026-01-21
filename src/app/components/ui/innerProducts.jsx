import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import useTheme from "../../../app/others/theme/theme-context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../provider/reducer/Likes/like";
import toast from "react-hot-toast";
import { addToCart } from "../../../provider/reducer/Cart/cart";

const InnerProducts = ({ el, setHoveredId, ratings, isHovered }) => {
  const { theme } = useTheme();
  const wishlist = useSelector((store) => store.wishlist.wishlist);

  const dispatch = useDispatch();

  const addToCartStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    transform: isHovered ? "translateY(0)" : "translateY(100%)",
    opacity: isHovered ? 1 : 0,
    transition: "all 0.3s ease",
    backgroundColor: theme ? "#d1d5dc" : "black",
    color: theme ? "black" : "white",
    borderRadius: 0,
  };

  const token = localStorage.getItem("token");

  return (
    <div>
      <Box
        key={el.id}
        onMouseEnter={() => setHoveredId(el.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <Box
          className={`${theme ? " bg-gray-800" : "bg-[#F5F5F5]"} w-[200px] h-[200px] px-2 flex justify-center items-center transition-transform duration-300 hover:scale-105 relative`}
        >
          <Box className="flex justify-between gap-1">
            <img
              className="object-center w-30 h-35"
              src={el?.images[0]?.base64}
              alt="product"
            />
            <Button
              variant="contained"
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToCart({ id: el.id }));
              }}
              style={addToCartStyle}
            >
              Add To Cart
            </Button>
            <Box className="flex flex-col absolute top-2 right-2 gap-2">
              <button
                className={`cursor-pointer ${theme ? "bg-gray-800" : "bg-white"} p-1 rounded-full`}
                sx={{ backgroundColor: theme ? "#1e2939" : "white" }}
                onClick={(e) => {
                  e.preventDefault();

                  if (!token) {
                    toast.error("You are not available to like.");
                    return;
                  }

                  const isExist = wishlist.find((item) => item.id === el.id);
                  if (isExist) {
                    dispatch(removeFromWishlist(el));
                    toast.success("Removed from wishlist");
                  } else {
                    dispatch(addToWishlist(el));
                    toast.success("Added to wishlist");
                  }
                }}
              >
                {token && wishlist.find((item) => item.id === el.id) ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </button>
              <button
                className={`cursor-pointer ${theme ? "bg-gray-800" : "bg-white"} p-1 rounded-full`}
                sx={{ backgroundColor: theme ? "#1e2939" : "white" }}
                onClick={(e) => {
                  e.preventDefault();
                  toast(
                    `This product has been viewed by ${el?.view?.length || 0} people.`,
                  );
                }}
              >
                <RemoveRedEyeOutlinedIcon />
              </button>
            </Box>
          </Box>
        </Box>
        <Box className="flex flex-col gap-1 pt-2 pl-2">
          <Typography className="font-bold " variant="h">
            {el.productName}
          </Typography>
          <Box>
            {el.disCount ? (
              <Box className="flex gap-4">
                <Typography>
                  <b className="text-[#DB4444]">${el.disCount}</b>
                </Typography>
                <Typography>
                  <del className="text-gray-700">${el.price}</del>
                </Typography>
              </Box>
            ) : (
              <Typography className="text-[#DB4444]">${el.price}</Typography>
            )}
          </Box>
          <Rating value={ratings[el.id] || 0} size="small" readOnly />
        </Box>
      </Box>
    </div>
  );
};

export default memo(InnerProducts);
