import { Outlet } from "react-router-dom";
import Header from "../../app/components/Layout/Header/Header";
import Footer from "../../app/components/Layout/Footer/Footer";

function HomeLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeLayout;
