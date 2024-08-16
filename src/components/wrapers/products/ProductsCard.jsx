import {
  ShoppingCartIcon,
  StarIcon as StarOutline,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../../context/CartContext";
import axios from "axios";
import { useUsers } from "../../../context/UserContext";

function ProductCard({
  id,
  name,
  category,
  description,
  price,
  imageId,
  game,
}) {
  const [hover, setHover] = useState(false);
  const [style, setStyle] = useState({});
  const { addToCart } = useContext(CartContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const { users } = useUsers();
  const username = users;

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await axios.get(
          `http://8ybg5l.realhost-free.net/Favorite/GetUserFavorites?userName=${username}`
        );
        if (response.status === 200) {
          const favorites = response.data;
          const isProductFavorite = favorites.some(
            (favorite) => favorite.productId === id
          );
          setIsFavorite(isProductFavorite);
        }
      } catch (error) {
        console.error("Error while getting favorite products", error);
      }
    };

    checkIfFavorite();
  }, [id, username]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xOffset = x / rect.width - 1;
    const yOffset = y / rect.height - 1;

    setStyle({
      transform: `perspective(1000px) rotateX(${yOffset * 10}deg) rotateY(${
        xOffset * 10
      }deg) scale(1.05)`,
    });
  };

  function handleMouseLeave() {
    setHover(false);
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
  }

  function handleAddToCart() {
    const product = { id, name, category, price, description, imageId };
    addToCart(product);
  }

  async function toggleFavorite() {
    if (!username) {
      console.error("Username not found");
      return;
    }

    try {
      const response = await axios.post(
        `http://8ybg5l.realhost-free.net/Favorite/AddNewFavorite?userName=${username}&productName=${name}`,
        null
      );
      if (response.status === 200) {
        setIsFavorite(!isFavorite);
      } else {
        console.error("Failed to add favorite", response);
      }
    } catch (error) {
      console.error("Error while adding favorite", error);
    }
  }

  return (
    <li>
      <div
        className={`relative w-full max-w-xs bg-white border border-gray-200 shadow-md rounded-lg transition-transform duration-300 ease-out ${
          hover
            ? "hover:shadow-lg hover:shadow-gigabyte-green hover:border-gigabyte-green"
            : ""
        }`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative">
          <div className="absolute z-10 bg-analytics-azule text-chiper-chartreuse font-semibold top-2 left-2 px-0.5 rounded-lg">
            {game}
          </div>
        </div>
        <div
          onClick={toggleFavorite}
          className="absolute right-5 top-5 hover:scale-110"
        >
          {isFavorite ? (
            <StarSolid className="h-8 text-yellow-300" />
          ) : (
            <StarOutline className="h-8 text-yellow-300" />
          )}
        </div>

        <div className="h-56 w-56 border m-4 rounded-lg flex justify-center items-center">
          image
        </div>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </h5>
          <span className="block text-gray-700">{category}</span>
          <div className="flex items-center justify-between mt-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {price}
            </span>
            <button
              className="text-white bg-gigabyte-green hover:bg-gigabyte-green/85 font-medium rounded-lg text-sm px-5 py-2.5 text-center ring-0 outline-none"
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon className="h-8" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
