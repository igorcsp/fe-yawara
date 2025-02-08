import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import InputField from "../../components/forms/InputField";
import SubmitButton from "../../components/forms/SubmitButton";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const success = await login(data.email, data.password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Senha ou e-mail inválidos.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            register={register}
            validationObject={{ required: "Email is required" }}
            error={errors.email}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            validationObject={{ required: "Email is required" }}
            error={errors.password}
          />

          <SubmitButton isLoading={isLoading}>Entrar</SubmitButton>

          <div className="text-sm text-center mt-4">
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
