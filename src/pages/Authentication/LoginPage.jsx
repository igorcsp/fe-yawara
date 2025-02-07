import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Form from "../../components/common/Form";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Por favor, insira um email válido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória"),
});

const LoginPage = () => {
  const [error, setError] = useState("");
  const { login, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    } else if (user) {
      navigate("/");
    }
  }, [user, isAdmin, navigate]);

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setError("");
      const success = await login(data.email, data.password);
      if (success) {
        reset();
        const { isAdmin } = useAuth();
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else setError("Email ou senha inválidos");
    } catch (err) {
      setError("Ocorreu um erro durante o login");
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div
              className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}

          <FormProvider {...methods}>
            <Form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
              noValidate
            >
              <Input
                customLabel="E-mail"
                name="email"
                placeholder="seu email"
                type="email"
                register={register}
                autoComplete="email"
              />
              <Input
                customLabel="Senha"
                name="password"
                placeholder="sua senha"
                type="password"
                register={register}
                autoComplete="current-password"
              />
            </Form>
          </FormProvider>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Não tem uma conta? </span>
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
