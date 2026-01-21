import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../../api/axiosRequest";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import toast from "react-hot-toast";
import useTheme from "../../app/others/theme/theme-context";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Account = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const { theme } = useTheme();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const getAccount = async () => {
      try {
        const { data } = await axiosRequest.get(`/Account/get-account-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        setAvatar(data.profile.image || "/default-avatar.png");
      } catch (error) {
        console.error(error);
        toast.error("Your account information was not found.");
      }
    };

    getAccount();
  }, [token, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageBase64(reader.result);
      setAvatar(reader.result);
    };
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axiosRequest.put(
        "/Account/change-account-user",
        {
          userName: newUserName || user.userName,
          image: imageBase64 || user.profile.image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUser(data);
      toast.success("Profile updated successfully!");
      setNewUserName("");
      setImageBase64("");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box className="pb-20">
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 8,
          p: 4,
          borderRadius: 3,
          bgcolor: theme ? "#1e2939" : "#ffffff",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
          transition: "box-shadow 0.3s ease",
          "&:hover": { boxShadow: "0 20px 50px rgba(0,0,0,0.25)" },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={4}
          textAlign="center"
          color="#1976d2"
        >
          Your account information
        </Typography>

        <Box className="flex items-center gap-5 mb-3">
          <Avatar
            src={avatar || "/default-avatar.png"}
            alt="User Avatar"
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="600">
              UserName: {user.userName}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: theme ? "white" : "gray" }}
            >
              Email: {user.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="500">
            Profile
          </Typography>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              textTransform: "none",
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#115293" },
              width: "fit-content",
              borderRadius: 2,
              px: 3,
            }}
          >
            Add Image
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>

          <TextField
            placeholder="New UserName"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "all 0.3s ease",
                bgcolor: theme ? "#334155" : "#fff",
                color: theme ? "#ffffff" : "#000000",
                "&:hover fieldset": {
                  borderColor: theme ? "#60a5fa" : "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme ? "#3b82f6" : "#115293",
                },
                "& input": { color: theme ? "#ffffff" : "#000000" },
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
            }}
          />

          <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpdate}>
            Save Changes
          </Button>
        </Box>

        <Typography mb={1}>Do you want to log out of your account?</Typography>
        <Button
          color="error"
          variant="outlined"
          startIcon={<LogoutIcon />}
          fullWidth
          sx={{
            mt: 1,
            borderRadius: 2,
            fontWeight: "500",
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "#fce4e4", borderColor: "#f44336" },
          }}
          onClick={() => {
            localStorage.removeItem("token");
            window.location = "/";
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Account;
