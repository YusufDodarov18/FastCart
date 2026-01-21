import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../provider/reducer/Likes/like";
import useTheme from "../../app/others/theme/theme-context";



export default function Wishlist() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const wishList = useSelector((store) => store.wishlist.wishlist);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    if (!token) {
      navigate("/");
      toast.error("Not available");
    }
  }, [token, navigate]);

  return (
    <div className="px-20 py-20">
      <Box>
        <header className="flex justify-between">
          <Typography variant="h6">Wishlist ({wishList.length})</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              wishList.forEach((el) => dispatch(removeFromWishlist(el)));
              toast.success("Wishlist cleared");
            }}
          >
            Clear Wishlist
          </Button>
        </header>
        <Box className="flex justify-center items-start gap-6 pt-10">
          {wishList.map((el) => (
            <Box key={el.id}>
              <Box
                className={`${theme ? " bg-gray-800" : "bg-[#F5F5F5]"} w-[200px] h-[200px] px-2 flex justify-center items-center transition-transform duration-300 hover:scale-105 relative`}
              >
                <Box className="flex justify-between gap-1">
                  <img
                    className="object-center w-30 h-35"
                    src={el.images?.[0].base64}
                    alt="product"
                  />
                  <Box className="flex flex-col absolute top-2 right-2 gap-2">
                    <button
                      onClick={() => {
                        dispatch(removeFromWishlist(el));
                        toast.success(
                          `${el.productName} removed from wishlist`,
                        );
                      }}
                      className={`cursor-pointer ${theme ? "bg-gray-800" : "bg-white"} p-1 rounded-full`}
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </Box>
                </Box>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: theme ? "#d1d5dc" : "black",
                  color: theme ? "black" : "white",
                }}
              >
                <ShoppingCartOutlinedIcon /> Add To Cart
              </Button>
              <Box className="flex flex-col gap-1 pt-2 pl-2">
                <Typography className="font-bold " variant="h">
                  {el.productName}
                </Typography>
                <Box>
                  {el.disCount ? (
                    <Box className="flex gap-4">
                      <Typography>
                        <b className="text-[#DB4444]">${el.price}</b>
                      </Typography>
                      <Typography>
                        <del className="text-gray-700">${el.disCount}</del>
                      </Typography>
                    </Box>
                  ) : (
                    <Typography className="text-[#DB4444]">
                      ${el.price}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}

