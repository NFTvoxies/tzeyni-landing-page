"use client";
import Link from "next/link";

const ProductList = ({ product, index }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Link href={`/Products/${index}`}>
        <a className="block">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-semibold text-gray-900">{product.price}</p>
        </a>
      </Link>
    </div>
  );
};

export default ProductList;