import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../others/theme/theme-context";
import logo22 from "../../../others/svg/logo22.svg";
import { Input } from "antd";
import cartImage from "../../../others/assets/image.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import LoginIcon from "@mui/icons-material/Login";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MaterialUISwitch from "../../../others/theme/muiTheme";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../../../provider/reducer/Likes/like";
import { clearCart, getCart } from "../../../../provider/reducer/Cart/cart";
import { axiosRequest } from "../../../../api/axiosRequest";
import { setSearchQuery } from "../../../../provider/reducer/Search/search";

const { Search } = Input;

const navLinks = [
  { path: "/", label: "Home", icon: <HomeIcon /> },
  { path: "/about", label: "About", icon: <InfoIcon /> },
  { path: "/contact", label: "Contact", icon: <ContactsIcon /> },
];

const signInLink = {
  path: "/login/sign-in",
  label: "Sign In",
  icon: <LoginIcon />,
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const wishlist = useSelector((store) => store.wishlist.wishlist);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const cart = useSelector((store) => store.cart.carts);
  const query = useSelector((store) => store.searchProducts.query);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const isActive = (path) => location.pathname == path;

  const [menu, setMenu] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenu(open);
  };

  const list = () => (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: theme ? "#202020" : "",
        color: theme ? "white" : "",
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Box className="flex justify-between items-center px-5 pt-2 pb-2">
          <Link to={"/"}>
            {theme ? (
              <img
                src={logo22}
                alt="Internet Magazin"
                className="w-30  dark:invert"
              />
            ) : (
              <img src={logo22} alt="Internet Magazin " className="w-30 " />
            )}
          </Link>
          <CloseIcon className="cursor-pointer" />
        </Box>
        {navLinks.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{ textDecoration: "none" }}
            >
              <ListItem className="mt-1" disablePadding>
                <ListItemButton
                  sx={{
                    backgroundColor: active
                      ? theme
                        ? "#0669ff"
                        : "#0669ff"
                      : "transparent",
                    color: active ? "white" : theme ? "white" : "black",
                    "&:hover": {
                      backgroundColor: active
                        ? theme
                          ? "#0556d1"
                          : "#0556d1"
                        : theme
                          ? "#333333"
                          : "#f0f0f0",
                      cursor: active ? "default" : "pointer",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: active ? "white" : theme ? "white" : "#0669ff",
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
        {!token && (
          <Link to={signInLink.path} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: theme ? "white" : "#0669ff" }}>
                  {signInLink.icon}
                </ListItemIcon>
                <ListItemText primary={signInLink.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </List>
      <List>
        <ListItem>
          <FormGroup>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              label={theme ? "Light Mode" : "Dark Mode"}
              onClick={() => toggleTheme()}
            />
          </FormGroup>
        </ListItem>
      </List>
    </Box>
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const getAccount = async () => {
        try {
          const { data } = await axiosRequest.get(`/Account/get-account-user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data);
          setAvatar(data.profile.image || "/default-avatar.png");
        } catch (error) {
          console.error(error);
        }
      };

      getAccount();
    }
  }, [token]);

  return (
    <header
      className={`shadow-md sticky top-0 z-50 ${theme ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8 ">
          <Box className="md:hidden flex items-center gap-3">
            <MenuIcon
              className="cursor-pointer"
              onClick={() => setMenu(true)}
            />
            <Typography variant="h6">Exclusive</Typography>
          </Box>
          <Link to={"/"}>
            {theme ? (
              <img
                src={cartImage}
                alt="Internet Magazin"
                className="w-37 hidden md:block"
              />
            ) : (
              <img
                src={logo22}
                alt="Internet Magazin"
                className="w-37 hidden md:block"
              />
            )}
          </Link>
          <nav className="hidden md:flex gap-6 font-medium">
            <Link
              className={`${isActive("/") ? `pointer-events-none ${theme ? "text-orange-400 " : "text-blue-600"}` : ""}`}
              to={"/"}
            >
              <p
                className={`${theme ? "hover:text-orange-500" : "hover:text-blue-500"} cursor-pointer`}
              >
                Home
              </p>
            </Link>
            <Link
              className={`${isActive("/about") ? `pointer-events-none ${theme ? "text-orange-400 " : "text-blue-600"}` : ""}`}
              to={"/about"}
            >
              <p
                className={`${theme ? "hover:text-orange-500" : "hover:text-blue-500"} cursor-pointer`}
              >
                About
              </p>
            </Link>
            <Link
              className={`${isActive("/contact") ? `pointer-events-none ${theme ? "text-orange-400 " : "text-blue-600"}` : ""}`}
              to={"/contact"}
            >
              <p
                className={`${theme ? "hover:text-orange-500" : "hover:text-blue-500"} cursor-pointer`}
              >
                Contact
              </p>
            </Link>
            {!token && (
              <Link
                className={`${isActive("/login/sign-in") ? `pointer-events-none ${theme ? "text-orange-400 " : "text-blue-600"}` : ""}`}
                to={"/login/sign-in"}
              >
                <p
                  className={`${theme ? "hover:text-orange-500" : "hover:text-blue-500"} cursor-pointer`}
                >
                  Sign In
                </p>
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center w-[440px] gap-4">
          <div className="w-190 hidden md:block">
            <Search
              placeholder="What are you looking for?"
              onSearch={null}
              size="middle"
              enterButton
              className="w-64 hidden"
              value={query}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-4 md:w-[440px] md:justify-end md:gap-4 w-full justify-end">
            {!token && (
              <button className="p-2  rounded-full transition relative cursor-pointer">
                <Link to={`/wishlist`}>
                  <FavoriteBorderIcon
                    sx={{ color: theme ? "white" : "black" }}
                  />
                  <span className="absolute top-[-2px] left-6 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    0
                  </span>
                </Link>
              </button>
            )}
            <Link to={`/cart`}>
              <button className="p-2 ml-[-10px] rounded-full transition relative cursor-pointer">
                <ShoppingCartOutlinedIcon
                  sx={{ color: theme ? "white" : "black" }}
                />
                <span className="absolute -top-0.5 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {cart?.reduce((acc, el) => acc + el.quantity, 0) || 0}
                </span>
              </button>
            </Link>
            <button
              className="p-2 ml-[-10px]  rounded-full transition hidden md:block"
              onClick={() => toggleTheme()}
            >
              {theme ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
            </button>
            {token && (
              <button className="p-2  cursor-pointer rounded-full transition">
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      {avatar ? (
                        <Avatar
                          src={avatar || "/default-avatar.png"}
                          alt={user?.userName[0]}
                          sx={{
                            width: 30,
                            ml: "-15px",
                            height: 30,
                          }}
                        />
                      ) : (
                        <AccountCircleOutlinedIcon
                          sx={{
                            width: 28,
                            height: 28,
                            color: theme ? "white" : "black",
                            ml: "-15px",
                          }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      ml: 2,
                      sx: {
                        overflow: "visible",
                        background: theme ? "#1e2939 " : "white",
                        color: theme ? "white" : "",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 26,
                          height: 26,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Link to={`/account/changeAccount`}>
                    <MenuItem onClick={handleClose}>
                      <Avatar /> My account
                    </MenuItem>
                  </Link>
                  <Link to="/wishlist">
                    <MenuItem
                      onClick={handleClose}
                      sx={{ display: "flex", gap: "8px", ml: "-2px" }}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: "1.6rem" }} />{" "}
                      Wishlist
                      <span className="absolute top-[2px] left-30 bg-red-500 text-white text-xs px-1.5 rounded-full">
                        {wishlist.length}
                      </span>
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("token");
                      handleClose();
                      toast.success("You have been logged out.");
                      wishlist.forEach((el) =>
                        dispatch(removeFromWishlist(el)),
                      );
                      dispatch(clearCart())
                    }}
                    sx={{ color: "red" }}
                  >
                    <ListItemIcon>
                      <Logout sx={{ color: "red" }} fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </button>
            )}
          </div>
        </div>
      </div>
      <SwipeableDrawer
        anchor="left"
        open={menu}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </header>
  );
}
