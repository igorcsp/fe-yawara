import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Por favor, insira um email válido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória"),
  phone: yup
    .string()
    .matches(/^\d{11}$/, "Telefone deve ter 11 dígitos")
    .required("Telefone é obrigatório"),
  address: yup.object().shape({
    street: yup.string().required("Rua é obrigatória"),
    city: yup.string().required("Cidade é obrigatória"),
    state: yup.string().required("Estado é obrigatório"),
    zipCode: yup.string().required("CEP é obrigatório"),
  }),
});

const RegisterPage = () => {
  const [error, setError] = useState("");
  const { registerUser } = useAuth();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setError("");
      const success = await registerUser(data);
      if (success) {
        console.log("Cadastra finalizado!");
        reset();
        navigate("/login");
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (err) {
      setError("Ocorreu um erro durante o cadastramento");
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Cadastro
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

          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${errors.name ? "border-red-300" : "border-gray-300"}`}
                  placeholder="Digite seu nome"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${errors.email ? "border-red-300" : "border-gray-300"}`}
                  placeholder="Digite seu email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${errors.password ? "border-red-300" : "border-gray-300"}`}
                  placeholder="Digite sua senha"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Telefone
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${errors.phone ? "border-red-300" : "border-gray-300"}`}
                  placeholder="Digite seu telefone"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Endereço
              </label>

              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rua
                </label>
                <div className="mt-1">
                  <input
                    id="street"
                    type="text"
                    {...register("address.street")}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                      ${
                        errors.address?.street
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    placeholder="Digite sua rua"
                  />
                  {errors.address?.street && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cidade
                </label>
                <div className="mt-1">
                  <input
                    id="city"
                    type="text"
                    {...register("address.city")}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                      ${
                        errors.address?.city
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    placeholder="Digite sua cidade"
                  />
                  {errors.address?.city && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estado
                </label>
                <div className="mt-1">
                  <input
                    id="state"
                    type="text"
                    {...register("address.state")}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                      ${
                        errors.address?.state
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    placeholder="Digite seu estado"
                  />
                  {errors.address?.state && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.address.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  CEP
                </label>
                <div className="mt-1">
                  <input
                    id="zipCode"
                    type="text"
                    {...register("address.zipCode")}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                      ${
                        errors.address?.zipCode
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    placeholder="Digite seu CEP"
                  />
                  {errors.address?.zipCode && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.address.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Já tem uma conta? </span>
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
