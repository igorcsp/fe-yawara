import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  name,
  description,
  price,
  stock,
  category,
  images,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={images}
        alt={name}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4">
        <Link to={`/products/${id}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate hover:font-bold">
            {name}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">
            R${price?.toFixed(2).toString().replace(".", ",")}
          </span>
          <span
            className={`text-sm ${
              stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </span>
        </div>
        {category && (
          <span className="mt-2 inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">
            {category}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
