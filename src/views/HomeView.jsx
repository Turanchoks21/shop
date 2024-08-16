import { useEffect, useState } from "react";
import ProductCard from "../components/wrapers/products/ProductsCard";
import SearchInput from "../components/inputs/SearchInput";

function HomeView() {
  const [productsData, setProductsData] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState(""); // состояние для поиска
  const [selectedGame, setSelectedGame] = useState(""); // состояние для выбранной игры

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://8ybg5l.realhost-free.net/Product/GetAllProductsInfo",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Received response is not JSON");
        }

        const data = await response.json();
        setProductsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Фильтрация продуктов
  const filteredProducts = productsData.filter((product) => {
    return (
      (selectedGame === "" || product.game === selectedGame) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="items-center mt-20 mb-8 space-y-4">
      <div className="bg-white rounded-lg px-8 py-4 space-y-2">
        <SearchInput
          placeholder="Search by name or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Обновление состояния поиска
        />
        <div className="space-x-4 flex">
          <button
            className={`text-analytics-azule font-semibold hover:scale-110 ${
              selectedGame === "Brawlhalla" ? "underline" : ""
            }`}
            onClick={() => setSelectedGame("Brawlhalla")} // Фильтр по игре
          >
            Brawlhalla
          </button>
          <button
            className={`text-analytics-azule font-semibold hover:scale-110 ${
              selectedGame === "CSGO 2" ? "underline" : ""
            }`}
            onClick={() => setSelectedGame("CSGO 2")}
          >
            CSGO 2
          </button>
          <button
            className={`text-analytics-azule font-semibold hover:scale-110 ${
              selectedGame === "Dota 2" ? "underline" : ""
            }`}
            onClick={() => setSelectedGame("Dota 2")}
          >
            Dota 2
          </button>
          <button
            className="text-analytics-azule font-semibold hover:scale-110"
            onClick={() => setSelectedGame("")}
          >
            All Games
          </button>
        </div>
      </div>
      <div className="bg-white rounded-md p-8">
        <div className="flex justify-center">
          {filteredProducts.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  description={product.description}
                  price={product.price}
                  game={product.game}
                  addToCart={() => addToCart(product)}
                />
              ))}
            </ul>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeView;
