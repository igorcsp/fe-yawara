import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

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
    <>
      <div>
        <Link to="/products">Voltar</Link>
        <h1>Product Details</h1>
        <img
          style={{ width: "50%" }}
          src={product?.images}
          alt={product?.name}
        />
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
        <p>Price: ${product?.price}</p>
      </div>
    </>
  );
};

export default ProductDetails;
