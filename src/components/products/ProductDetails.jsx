import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URI}/products/${params.id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/products"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Voltar
      </Link>

      {user?.isAdmin && (
        <Link to={`/admin/products/${params.id}/edit`} className="px-7">
          Editar produto
        </Link>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              className="w-full h-full object-cover object-center"
              src={product?.images}
              alt={product?.name}
            />
          </div>

          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Product Details
            </h1>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {product?.name}
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product?.description}
            </p>

            <p className="text-2xl font-bold text-blue-600">
              R${product?.price.toFixed(2).toString().replace(".", ",")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
