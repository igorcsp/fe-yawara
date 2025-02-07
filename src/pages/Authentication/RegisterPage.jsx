import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";

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
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setError("");
      const success = await registerUser(data);
      if (success) {
        reset();
        navigate("/login");
      } else {
        setError("Erro ao cadastrar usuário");
      }
    } catch (err) {
      setError("Ocorreu um erro durante o cadastramento");
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Cadastro
      </h2>
      <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <FormProvider {...methods}>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input customLabel="Nome" name="name" placeholder="seu nome" />
            <Input customLabel="E-mail" name="email" placeholder="seu email" />
            <Input
              customLabel="Senha"
              name="password"
              placeholder="sua senha"
              type="password"
            />
            <Input
              customLabel="Telefone"
              name="phone"
              placeholder="seu telefone"
              type="tel"
            />

            <fieldset className="space-y-4">
              <legend className="block text-sm font-medium text-gray-700">
                Endereço
              </legend>
              <Input
                customLabel="Rua"
                name="address.street"
                placeholder="sua rua"
              />
              <Input
                customLabel="Cidade"
                name="address.city"
                placeholder="sua cidade"
              />
              <Input
                customLabel="Estado"
                name="address.state"
                placeholder="seu estado"
              />
              <Input
                customLabel="CEP"
                name="address.zipCode"
                placeholder="seu CEP"
              />
            </fieldset>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 border rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </FormProvider>

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
  );
};

export default RegisterPage;
