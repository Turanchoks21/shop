import { useEffect, useState } from "react";
import ProductCard from "../components/wrapers/products/ProductsCard";
import { useUsers } from "../context/UserContext";
import axios from "axios";

function FavoriteView() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { users } = useUsers();
  const username = users;

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(
          `http://8ybg5l.realhost-free.net/Favorite/GetUserFavorites?userName=${username}`
        );

        if (response.status === 200) {
          const favoriteProductIds = response.data.map(
            (item) => item.productId
          );

          const productResponse = await axios.get(
            "http://8ybg5l.realhost-free.net/Product/GetAllProductsInfo"
          );

          if (productResponse.status === 200) {
            const allProducts = productResponse.data;
            const filteredProducts = allProducts.filter((product) =>
              favoriteProductIds.includes(product.id)
            );
            setFavoriteProducts(filteredProducts);
          }
        }
      } catch (error) {
        console.error("Error while fetching favorite products", error);
      }
    };

    fetchFavoriteProducts();
  }, [username]);

  return (
    <>
      <div className="bg-white mt-20 rounded-lg p-8">
        {favoriteProducts.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                description={product.description}
                price={product.price}
                game={product.game}
              />
            ))}
          </ul>
        ) : (
          <p>No favorite products available.</p>
        )}
      </div>
    </>
  );
}

export default FavoriteView;
