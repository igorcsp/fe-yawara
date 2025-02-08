import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import InputField from "../../components/forms/InputField";
import SubmitButton from "../../components/forms/SubmitButton";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const success = await registerUser(data);
      if (success) {
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow mb-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crie sua conta
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <InputField
            label="Nome completo"
            name="name"
            register={register}
            error={errors.name}
          />

          <InputField
            label="E-mail"
            name="email"
            type="email"
            register={register}
            validationObject={{ required: "Email is required" }}
            error={errors.email}
          />

          <InputField
            label="Senha"
            name="password"
            type="password"
            register={register}
            validationObject={{ required: "Email is required" }}
            error={errors.password}
          />

          <InputField
            label="Telefone"
            name="phone"
            register={register}
            validationObject={{ required: "Email is required" }}
            error={errors.phone}
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Endereço </h3>
          <div className="space-y-4">
            <InputField
              label="Rua"
              name="address.street"
              register={register}
              validationObject={{ required: "Email is required" }}
              error={errors?.address?.street}
            />

            <InputField
              label="Cidade"
              name="address.city"
              register={register}
              validationObject={{ required: "Email is required" }}
              error={errors?.address?.city}
            />

            <InputField
              label="Estado"
              name="address.state"
              register={register}
              validationObject={{ required: "Email is required" }}
              error={errors?.address?.state}
            />

            <InputField
              label="CEP"
              name="address.zipCode"
              register={register}
              validationObject={{ required: "Email is required" }}
              error={errors?.address?.zipCode}
            />
          </div>
        </div>

        <SubmitButton isLoading={isLoading}>Criar Conta</SubmitButton>

        <div className="text-sm text-center mt-4">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Entrar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
