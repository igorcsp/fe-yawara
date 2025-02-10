import Logo from "../components/common/Logo";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Bem vindo{user && `, ${user?.name}`}</h1>
      <Logo />
    </>
  );
};

export default HomePage;
