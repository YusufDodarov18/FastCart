import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "../../../others/theme/theme-context";

function Loading() {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 2,
        backgroundColor: theme ? "#1a1a1a" : "#f5f5f5",
        transition: "background-color 0.3s ease",
      }}
    >
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: theme ? "oklch(62.3% 0.214 259.815)" : "#7f22fe",
          animation: "spin 1.5s linear infinite",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: theme ? "#333" : "#eee",
          fontWeight: "bold",
          textShadow: theme ? "1px 1px #ccc" : "1px 1px #000",
          animation: "fadeIn 1s ease-in-out infinite alternate",
        }}
      >
        Please be patient...
      </Typography>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            0% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
}

export default Loading;
