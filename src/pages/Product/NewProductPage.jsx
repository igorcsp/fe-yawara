import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/forms/InputField";
import SubmitButton from "../../components/forms/SubmitButton";
import axios from "axios";

const NewProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URI}/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        setError("Erro ao carregar categorias:" + error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      images: [],
    },
    rules: {
      images: {
        required: "É necessário incluir pelo menos uma imagem",
      },
    },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setValue("images", files.length > 0 ? files : null);
    trigger("images");
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(""); // Limpa erros anteriores

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      Object.keys(data).forEach((key) => {
        if (key !== "images") {
          formData.append(key, data[key]);
        }
      });

      await axios.post(`${import.meta.env.VITE_API_URI}/products`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
    } catch (error) {
      if (error.response?.data) {
        // Se o erro for um array, pegue a primeira mensagem
        if (Array.isArray(error.response.data)) {
          setError(error.response.data[0].message);
        } else {
          // Se for uma string ou objeto simples
          setError(error.response.data.toString());
        }
      } else {
        setError("Erro ao criar produto");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow mb-24">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Cadastrar novo produto
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Nome do produto"
          name="name"
          type="text"
          register={register}
          validationObject={{
            required: "Necessário incluir o nome do produto",
            minLength: {
              value: 3,
              message: "O nome deve ter no mínimo 3 caracteres",
            },
            maxLength: {
              value: 100,
              message: "O nome deve ter no máximo 100 caracteres",
            },
          }}
          error={errors.name}
        />

        <InputField
          label="Descrição"
          name="description"
          type="text"
          register={register}
          validationObject={{
            required: "Necessário incluir a descrição do produto",
            minLength: {
              value: 10,
              message: "A descrição deve ter no mínimo 10 caracteres",
            },
            maxLength: {
              value: 2000,
              message: "A descrição deve ter no máximo 2000 caracteres",
            },
          }}
          error={errors.description}
        />

        <InputField
          label="Preço"
          name="price"
          type="text"
          register={register}
          validationObject={{
            required: "Necessário incluir o valor do produto",
            min: {
              value: 0,
              message: "O preço não pode ser negativo",
            },
          }}
          error={errors.price}
        />

        <InputField
          label="Quantidade em estoque"
          name="stock"
          type="number"
          register={register}
          validationObject={{
            required: "Necessário incluir a quantidade em estoque",
            min: {
              value: 0,
              message: "A quantidade não pode ser negativa",
            },
          }}
          error={errors.stock}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <select
            {...register("categoryId", {
              required: "Necessário selecionar uma categoria",
            })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Selecionar...</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Imagens
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {errors.images && (
            <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
          )}
          {selectedFiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="text-sm text-gray-500">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <SubmitButton isLoading={isLoading}>Finalizar</SubmitButton>
      </form>
    </div>
  );
};

export default NewProductPage;
