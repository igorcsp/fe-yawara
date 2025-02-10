import { useState } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const processImages = (images) => {
    if (!images) return [];
    if (typeof images === "string") return [images];
    if (typeof images === "string" && images.startsWith("[")) {
      try {
        return JSON.parse(images);
      } catch {
        return [images];
      }
    }
    return Array.isArray(images) ? images : [images];
  };

  const imageList = processImages(images);

  const getImageUrl = (imageData) => {
    if (!imageData) return "/placeholder-image.jpg";
    if (typeof imageData === "string" && imageData.startsWith("data:")) {
      return imageData;
    }
    if (typeof imageData === "string" && imageData.startsWith("http")) {
      return imageData;
    }
    return `data:image/jpeg;base64,${imageData}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="relative">
        {imageList.length > 0 && !imageError ? (
          <>
            <img
              src={getImageUrl(imageList[currentImageIndex])}
              alt={name}
              className="w-full h-48 object-cover object-center transition-opacity duration-300"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                setImageError(true);
              }}
            />
            {imageList.length > 1 && (
              <>
                {/* Botões de navegação */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? imageList.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex((prev) =>
                      prev === imageList.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                >
                  →
                </button>
                {/* Indicadores */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {imageList.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentImageIndex === index ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Imagem indisponível</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/products/${id}`} className="block group">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate group-hover:text-indigo-600 transition-colors">
            {name}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">
            R$ {price?.toFixed(2).toString().replace(".", ",")}
          </span>
          <span
            className={`text-sm ${
              stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {stock > 0 ? `${stock} em estoque` : "Fora de estoque"}
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
