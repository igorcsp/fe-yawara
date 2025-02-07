import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import Form from "../../components/common/Form";
import Input from "../../components/common/Input";

const productSchema = yup.object().shape({
  email: yup
    .string()
    .email("Por favor, insira um email válido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória"),
});

const NewProductPage = () => {
  const [error, setError] = useState("");
  const methods = useForm({
    resolver: yupResolver(productSchema),
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
      console.log(data);
      reset();
      //   setError("");
      //   const success = await login(data.email, data.password);
      //   if (success) {
      //     reset();
      //     navigate("/admin");
      //   } else setError("Email ou senha inválidos");
    } catch (err) {
      setError("Ocorreu um erro durante o login");
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Novo produto
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
                id="nameProduto"
                customLabel="Nome"
                name="name"
                placeholder="o nome do produto"
                type="text"
                register={register}
              />
              <Input
                id="descrição"
                customLabel="Descrição"
                name="description"
                placeholder="a descrição"
                type="text"
                register={register}
              />
              <Input
                id="preço"
                customLabel="Preço"
                name="price"
                placeholder="o preço"
                type="number"
                register={register}
              />
              <Input
                id="quantidade"
                customLabel="Quantidade em estoque"
                name="stock"
                placeholder="a quantidade em estoque"
                type="number"
                register={register}
              />
              <Input
                id="categoria"
                customLabel="Categoria"
                name="categoryId"
                placeholder="a categoria"
                type="text"
                register={register}
              />
              <Input
                id="imagens"
                customLabel="imagens"
                name="images"
                placeholder="as imagens"
                type="url"
                register={register}
              />
            </Form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default NewProductPage;
