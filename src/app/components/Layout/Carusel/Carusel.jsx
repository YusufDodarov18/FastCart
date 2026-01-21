import { Carousel } from "antd";
import AppleIcon from "@mui/icons-material/Apple";
import { Shirt } from "lucide-react";
import iphone1 from "../../../others/assets/dde156768866e096de511779e65c7299-removebg-preview.png";
import iphone2 from "../../../others/assets/b259d37cb626d56d9f9889337ed850b6-removebg-preview (1).png";
import cloth from "../../../others/assets/bab5383ed16c1f082e3a26be99731221-removebg-preview.png";
import InnerCarousel from "../../ui/innerCarusel";

const CarouselMenu = () => (
  <Carousel className="w-full max-w-[980px] mx-auto" autoplay={{ dotDuration: true }} autoplaySpeed={3000}>
    <InnerCarousel icon={<AppleIcon className="!text-[40px] md:!text-[60px] text-white" />} title="iPhone 14 Series" subtitle="Up to 10% off Voucher" imgSrc={iphone1}/>
    <InnerCarousel icon={<AppleIcon className="!text-[40px] md:!text-[60px] text-white" />} title="iPhone 17 Promax" subtitle="Make your dreams come true." imgSrc={iphone2}/>
    <InnerCarousel icon={<Shirt className="!text-[40px] md:!text-[60px] text-white" />} title="Winter coat" subtitle="On sale at 15% off" imgSrc={cloth}/>
  </Carousel>
);

export default CarouselMenu;