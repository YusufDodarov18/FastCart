import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../app/others/theme/theme-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../../api/axiosRequest";
import toast from "react-hot-toast";
import { clearCart } from "../../provider/reducer/Cart/cart";
import { addOrder } from "../../provider/reducer/Order/order";

export default function Order() {
  const cart = useSelector((store) => store.cart.carts);
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [address, setAddres] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token || cart.length === 0) {
      navigate("/");
    }
    const getAccount = async () => {
      try {
        const { data } = await axiosRequest.get(`/Account/get-account-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAccount();
  }, [token]);

  const subtotal = cart.reduce((acc, el) => {
    const finalPrice =
      el.product.disCount > 0 ? el?.product?.disCount : el.product.price;
    return acc + finalPrice * el.quantity;
  }, 0);

  const order = {
    userId: user?.userId,
    name,
    surName,
    phone,
    address,
    message,
    total: subtotal,
    date_of_order: new Date(),
    order_user: cart,
  };

  const clearOrder = () => {
    setAddres("");
    setName("");
    setPhone("");
    setSurName("");
    dispatch(clearCart());
    navigate("/");
  };

  const handleOrder = () => {
    if (!user?.userId || !name || !surName || !phone || !address) {
      toast.error("userId no loaded");
      return;
    }
    dispatch(addOrder(order));
    clearOrder();
  };

  const styleInput = {
    mt: 1,
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "all 0.3s ease",
      color: theme ? "#ffffff" : "#000000",
      "&:hover fieldset": {
        borderColor: theme ? "#60a5fa" : "#1976d2",
      },
      "& .MuiInputLabel-root": {
        color: theme ? "#cbd5e1" : "#6b7280",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme ? "#475569" : "#d1d5db",
    },
    "& .MuiInputBase-input::placeholder": {
      color: theme ? "#94a3b8" : "#9ca3af",
      opacity: 1,
    },
  };
  return (
    <Box className="py-10 px-20">
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
        Order
      </Typography>

      <Box className="flex gap-10 flex-col md:flex-row">
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Billing Details
          </Typography>

          <Box component="form" className="flex flex-col gap-2">
            <TextField
              sx={styleInput}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
              fullWidth
            />
            <TextField
              sx={styleInput}
              onChange={(e) => setSurName(e.target.value)}
              placeholder="Last name"
              fullWidth
            />
            <TextField
              sx={styleInput}
              onChange={(e) => setAddres(e.target.value)}
              placeholder="Address"
              fullWidth
            />
            <TextField
              sx={styleInput}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              fullWidth
            />

            <Box
              component="textarea"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
              style={{
                height: "100px",
                padding: "12px",
                color: theme ? "white" : "black",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontFamily: "inherit",
                resize: "none",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          {cart?.map((products) => (
            <Box
              key={products.product.id}
              className="flex items-center justify-between mb-2"
            >
              <Box className="flex items-center gap-2">
                <img
                  src={products.product.images[0].base64}
                  alt="product"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
                <Typography>{products.product.productName}</Typography>
              </Box>
              <Typography>${products.product.price}</Typography>
            </Box>
          ))}

          <Box className="mt-4">
            <Box className="flex justify-between mb-3">
              <Typography>Subtotal:</Typography>
              <Typography>${subtotal}</Typography>
            </Box>

            <Box className="flex justify-between mb-3">
              <Typography>Shipping:</Typography>
              <Typography>Free</Typography>
            </Box>

            <Box sx={{ borderTop: "1px solid #ddd", pt: 2 }}>
              <Box className="flex justify-between mb-3">
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  ${subtotal}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#DB4444",
                  py: 1.5,
                  "&:hover": { bgcolor: "#c73b3b" },
                }}
                onClick={handleOrder}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
