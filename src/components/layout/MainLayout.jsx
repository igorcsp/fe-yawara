import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <div className="flex flex-col items-center justify-center font-bold">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
