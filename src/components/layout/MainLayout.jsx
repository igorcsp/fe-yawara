import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-blue-50 box-border">
      <Header />
      <div className="flex flex-col items-center justify-center font-bold mt-8 min-h-[77.8vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
