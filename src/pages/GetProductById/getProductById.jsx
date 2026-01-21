import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductsById } from "../../provider/reducer/Products/getProductsById";
import { Box, Button, Rating, Typography } from "@mui/material";
import useTheme from "../../app/others/theme/theme-context";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast from "react-hot-toast";
import LoopIcon from "@mui/icons-material/Loop";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../../app/components/Layout/Loading/Loading";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../provider/reducer/Likes/like";
import InnerProducts from "../../app/components/ui/innerProducts";
import {
  addToCart,
  decreaseFromCart,
  getCart,
} from "../../provider/reducer/Cart/cart";
import SearchProducts from "../../app/components/ui/search";
import { setSearchQuery } from "../../provider/reducer/Search/search";

const GetProduct = () => {
  const { theme } = useTheme();
  const { id } = useParams();

  const allProducts = useSelector((store) => store.products.products);
  const products = useSelector((store) => store.productById?.selectedProduct);
  const cart = useSelector((store) => store.cart?.carts);
  const dispatch = useDispatch();
  const query = useSelector((store) => store.searchProducts.query);

  const [ratings, setRatings] = useState({});
  const wishlist = useSelector((store) => store.wishlist.wishlist);
  const [loading, setLoading] = useState(true);
  const [ratings2, setRatings2] = useState({});
  const [hoveredId, setHoveredId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(getCart());
    dispatch(getProductsById(id)).finally(() => setLoading(false));
  }, [dispatch, id]);

  useEffect(() => {
    if (products) {
      setRatings({ [products?.id]: Math.floor(Math.random() * 5) + 1 });
    }
  }, [products]);

  const style = {
    cursor: "default",
    pointerEvents: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:active": {
      backgroundColor: "transparent",
    },
    "&:focus": {
      backgroundColor: "transparent",
    },
    color: theme ? "white" : "black",
    fontSize: "18px",
    borderTop: "1px solid gray",
    borderBottom: "1px solid gray",
  };

  useEffect(() => {
    if (allProducts.length) {
      const obj = {};
      allProducts.forEach((p) => {
        obj[p.id] = Math.floor(Math.random() * 5) + 1;
      });
      setRatings2(obj);
    }
  }, [allProducts]);

  const addToWishlists = (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("You are not available to like.");
      return;
    }
    const isExist = wishlist.find((item) => item.id === products.id);
    if (isExist) {
      dispatch(removeFromWishlist(products));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(products));
      toast.success("Added to wishlist");
    }
  };

  if (!products) {
    return <Loading />;
  }

  const quantity =
    cart.find((item) => item.product.id === products?.id)?.quantity || 0;

  return (
    <div className="px-6 md:px-20 py-14">
      <Box className="flex justify-between">
        <Button onClick={() => navigate("/")}>
          <ArrowBackIcon />
          Back
        </Button>
        <Typography variant="h6" className="font-semibold mb-8">
          More Detail
        </Typography>
      </Box>
      <Box className="flex justify-center pt-10">
        {products?.images?.length > 1 ? (
          <Box
            className={`flex flex-col lg:flex-row gap-10 ${theme ? "bg-gray-900" : "bg-white"}  p-6 rounded-2xl shadow-lg w-full max-w-6xl`}
          >
            <Box className="flex flex-col-reverse md:flex-row gap-6">
              <Box className="flex md:flex-col gap-3">
                {products?.images?.slice(1, 5).map((img) => (
                  <Box
                    key={img.id}
                    className={`${theme ? "bg-gray-800" : "bg-[#F5F5F5]"} p-2 rounded-xl cursor-pointer hover:ring-2 hover:ring-red-400 transition`}
                  >
                    <img
                      src={img.base64}
                      className="w-[90px] h-[100px] object-contain"
                    />
                  </Box>
                ))}
              </Box>
              <Box
                className={`${theme ? "bg-gray-800" : "bg-[#F5F5F5]"} rounded-2xl p-4 flex justify-center items-center`}
              >
                <img
                  src={products?.images[0].base64}
                  className="w-[360px] object-contain"
                  alt="product"
                />
              </Box>
            </Box>

            <Box className="flex flex-col gap-4">
              <Typography variant="h5" className="font-bold">
                {products?.productName}
              </Typography>
              <Box className="flex items-center gap-2">
                <Rating
                  value={ratings[products?.id] || 0}
                  size="small"
                  readOnly
                />
                <Typography className="text-green-500 text-sm">
                  In Stock
                </Typography>
              </Box>
              <Typography variant="h6" className="text-red-500 font-semibold">
                ${products?.price}
              </Typography>
              <p className={`${theme ? "text-gray-300" : "text-gray-600"}`}>
                {products.description || "No description"}
              </p>

              <Box className="flex items-center gap-3">
                <Typography className="font-medium">Colours:</Typography>
                <Box className="flex gap-2">
                  {products.colors.map((el) => (
                    <Box
                      sx={{
                        backgroundColor: el.color,
                      }}
                      key={el.id}
                      className="w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition shadow"
                    ></Box>
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="h" sx={{ fontWeight: "bold" }}>
                  View: {products.view?.length}
                </Typography>
              </Box>

              <Box className="flex flex-wrap items-center gap-4 pt-3">
                <Box className="flex">
                  <Button
                    sx={{ backgroundColor: "#DB4444" }}
                    variant="contained"
                    onClick={() => {
                      dispatch(decreaseFromCart({ id: products?.id }));
                    }}
                  >
                    <RemoveIcon />
                  </Button>
                  <Button style={style}>{quantity}</Button>
                  <Button
                    sx={{ backgroundColor: "#DB4444" }}
                    variant="contained"
                    onClick={() => {
                      dispatch(addToCart({ id: products?.id }));
                    }}
                  >
                    <AddIcon />
                  </Button>
                </Box>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#DB4444" }}
                  className="px-8"
                  onClick={() => {
                    dispatch(addToCart({ id: products?.id }));
                  }}
                >
                  Buy Now
                </Button>
                <Button variant="outlined" onClick={(e) => addToWishlists(e)}>
                  {token && wishlist.find((item) => item.id === products.id) ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </Button>
              </Box>

              <Box className="mt-6 space-y-3">
                <Box
                  className={`flex gap-3 border rounded-xl p-4 ${theme ? "border-gray-700" : "border-gray-300"}`}
                >
                  <LocalShippingIcon />
                  <Box>
                    <Typography className="font-medium" variant="h6">
                      Free Delivery
                    </Typography>
                    <p className="text-sm text-gray-500">
                      Enter your postal code for Delivery Availability
                    </p>
                  </Box>
                </Box>
                <Box
                  className={`flex gap-3 border rounded-xl p-4 ${theme ? "border-gray-700" : "border-gray-300"}`}
                >
                  <LoopIcon />
                  <Box>
                    <Typography className="font-medium" variant="h6">
                      Return Delivery
                    </Typography>
                    <p className="text-sm text-gray-500">
                      Free 30 Days Delivery Returns
                    </p>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box
              className={`flex flex-col lg:flex-row gap-10 ${theme ? "bg-gray-900" : "bg-white"}  p-6 rounded-2xl shadow-lg w-full max-w-6xl`}
            >
              <Box
                className={`${theme ? "bg-gray-800" : "bg-[#F5F5F5]"} rounded-2xl p-4 flex justify-center items-center`}
              >
                <img
                  src={products?.images[0].base64}
                  className="w-[360px] object-contain"
                  alt="product"
                />
              </Box>
              <Box className="flex flex-col gap-4">
                <Typography variant="h5" className="font-bold">
                  {products.productName}
                </Typography>
                <Box className="flex items-center gap-2">
                  <Rating
                    value={ratings[products.id] || 0}
                    size="small"
                    readOnly
                  />
                  <Typography className="text-green-500 text-sm">
                    In Stock
                  </Typography>
                </Box>
                {products.disCount ? (
                  <Typography
                    variant="h6"
                    className="text-red-500 font-semibold"
                  >
                    ${products.disCount}
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    className="text-red-500 font-semibold"
                  >
                    ${products.price}
                  </Typography>
                )}
                <p className={`${theme ? "text-gray-300" : "text-gray-600"}`}>
                  {products.description || "No description"}
                </p>

                <Box className="flex items-center gap-3">
                  <Typography className="font-medium">Colours:</Typography>
                  <Box className="flex gap-2">
                    {products.colors.map((el) => (
                      <Box
                        sx={{
                          backgroundColor: el.color,
                        }}
                        key={el.id}
                        className="w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition shadow"
                      ></Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h" sx={{ fontWeight: "bold" }}>
                    View: {products.view?.length}
                  </Typography>
                </Box>
                <Box className="flex flex-wrap items-center gap-4 pt-3">
                  <Box className="flex">
                    <Button
                      sx={{ backgroundColor: "#DB4444" }}
                      variant="contained"
                      onClick={() => {
                        dispatch(decreaseFromCart({ id: products?.id }));
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button style={style}>{quantity}</Button>
                    <Button
                      sx={{ backgroundColor: "#DB4444" }}
                      variant="contained"
                      onClick={() => {
                        dispatch(addToCart({ id: products?.id }));
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#DB4444" }}
                    className="px-8"
                    onClick={() => {
                      dispatch(addToCart({ id: products?.id }));
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button variant="outlined" onClick={(e) => addToWishlists(e)}>
                    {token &&
                    wishlist.find((item) => item.id === products.id) ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </Button>
                </Box>

                <Box className="mt-6 space-y-3">
                  <Box
                    className={`flex gap-3 border rounded-xl p-4 ${theme ? "border-gray-700" : "border-gray-300"}`}
                  >
                    <LocalShippingIcon />
                    <Box>
                      <Typography className="font-medium" variant="h6">
                        Free Delivery
                      </Typography>
                      <p className="text-sm text-gray-500">
                        Enter your postal code for Delivery Availability
                      </p>
                    </Box>
                  </Box>
                  <Box
                    className={`flex gap-3 border rounded-xl p-4 ${theme ? "border-gray-700" : "border-gray-300"}`}
                  >
                    <LoopIcon />
                    <Box>
                      <Typography className="font-medium" variant="h6">
                        Return Delivery
                      </Typography>
                      <p className="text-sm text-gray-500">
                        Free 30 Days Delivery Returns
                      </p>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box className="pt-15">
        <Box className="flex flex-col md:flex-row gap-[10px] items-center mb-6">
          <Box className="border-[#DB4444] border-[1px] bg-[#DB4444] w-[20px] h-[40px] rounded-md shadow-md" />
          <Typography variant="h6" className="text-[#DB4444] font-semibold">
            Related Item
          </Typography>
        </Box>
        <div className="flex justify-between flex-col md:flex-row"></div>
      </Box>
      <Box>
        <Box className="flex gap-6 flex-wrap justify-center">
          {allProducts
            .filter((el) => el.id !== products?.id)
            .filter((el) =>
              el.productName.toLowerCase().includes(query.toLowerCase()),
            )
            .map((el) => {
              const isHovered = hoveredId === el.id;
              return (
                <Link to={`/product/get-product-by-id/${el.id}`}>
                  <InnerProducts
                    el={el}
                    setHoveredId={setHoveredId}
                    isHovered={isHovered}
                    ratings={ratings2}
                  />
                </Link>
              );
            })}
        </Box>
      </Box>
    </div>
  );
};

export default GetProduct;
