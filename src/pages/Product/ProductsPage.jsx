import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/products/ProductCard";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URI}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {user?.isAdmin && (
        <Link to="/admin/products/new" className="bg-blue-500 text-white p-2 rounded">
          Adicionar produto
        </Link>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            id={product._id}
            key={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            stock={product.stock}
            images={product.images}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
