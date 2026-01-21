import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { inputSx } from "../../app/others/theme/muiTheme";
import useTheme from "../../app/others/theme/theme-context";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Contact = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-center gap-8 flex-wrap mt-20 pb-50">
      <Box className="shadow-lg rounded-md p-6 w-[320px] space-y-6">
          <div className="flex items-start gap-4">
              <div className="bg-[#DB4444] w-10 h-10 rounded-full flex items-center justify-center text-white">
                  <LocalPhoneIcon fontSize="small" />
              </div>
              <div>
                  <h4 className="font-semibold text-lg">Call To Us</h4>
                  <p className="text-sm text-gray-600 mt-1">We are available 24/7, 7 days a week.</p>
                  <p className="text-sm text-gray-600 mt-1">Phone: +8801611112222</p>
              </div>
          </div>
        <hr />
        <div className="flex items-start gap-4">
          <div className="bg-[#DB4444] w-10 h-10 rounded-full flex items-center justify-center text-white">
            <EmailOutlinedIcon fontSize="small" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">Write To Us</h4>
            <p className="text-sm text-gray-600 mt-1">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-sm text-gray-600 mt-2">Emails: customer@exclusive.com</p>
            <p className="text-sm text-gray-600">Emails: support@exclusive.com</p>
          </div>
        </div>
      </Box>

      <Box className=" shadow-lg rounded-md p-6 w-[650px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField
            sx={{...inputSx(theme),border: `1px solid ${theme ? "white" : "gray"}`}}
            placeholder="Name"
          />
          <TextField
              sx={{...inputSx(theme),border: `1px solid ${theme ? "white" : "gray"}`}}
              placeholder="Email"
          />
          <TextField
            sx={{...inputSx(theme),border: `1px solid ${theme ? "white" : "gray"}`}}
            placeholder="Phone"
          />
        </div>

         <textarea
           className={`w-full mt-4 h-36 rounded-md border px-3 py-2 resize-none outline-none${theme? "border-gray-500 placeholder:text-white text-white bg-transparent" :"border-gray-300 placeholder:text-gray-500"}`}
           placeholder="Your Message"
         />

        <div className="flex justify-end mt-4">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#DB4444",
              paddingX: "32px",
              paddingY: "10px",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { backgroundColor: "#c73a3a" },
            }}
          >
            Send Message
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Contact;
