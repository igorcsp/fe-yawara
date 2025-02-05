import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Bem vindo, {user?.name}</h1>
      <h1>HomePage</h1>
    </>
  );
};

export default HomePage;
