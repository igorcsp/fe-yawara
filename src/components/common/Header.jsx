import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    logout();
  };

  const getNavLinkClass = ({ isActive, isPending }) => {
    if (isPending) {
      return "text-white";
    } else if (isActive) {
      return "text-gray-200 font-bold";
    } else {
      return "text-gray-400 hover:text-white";
    }
  };

  return (
    <header className="flex flex-row justify-between p-4 items-center bg-gray-800">
      <NavLink to="/">
        <img src="/yawara.png" className="w-20" />
      </NavLink>
      <NavLink className={getNavLinkClass} to="/products">
        Produtos
      </NavLink>
      <NavLink className={getNavLinkClass} to="/about">
        Sobre
      </NavLink>
      {user ? (
        <button
          className="text-gray-400 hover:text-white"
          onClick={handleLogout}
        >
          Sair
        </button>
      ) : (
        <div className="text-gray-400">
          <NavLink className={getNavLinkClass} to="/login">
            Login
          </NavLink>{" "}
          |{" "}
          <NavLink className={getNavLinkClass} to="/register">
            Cadastre-se
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
