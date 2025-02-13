import { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {user?.isAdmin && (
        <Link
          to="/admin/products/new"
          className="flex flex-row left-0 bg-blue-500 text-white p-2 rounded"
        >
          Adicionar produto
        </Link>
      )}
      <div className="container mx-auto px-4 py-8">
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
    </>
  );
};

export default ProductsPage;
