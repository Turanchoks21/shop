import { useEffect, useState } from "react";
import ProductInOrder from "../components/wrapers/products/ProductInOrder";
import { useUsers } from "../context/UserContext";
import axios from "axios";

function HistoryView() {
  const [orders, setOrders] = useState([]);
  const { users } = useUsers();
  const username = users.username;

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          `https://8ybg5l.realhost-free.net/Order/GetUserOrdersHistory?userName=${username}`
        );

        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error while fetching order history", error);
      }
    };

    fetchOrderHistory();
  }, [username]);

  return (
    <div className="bg-white mt-20 rounded-lg p-8">
      {orders.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
          {orders.map((order) => (
            <ProductInOrder
              key={order.id}
              id={order.id}
              date={order.date}
              totalPrice={order.totalPrice}
              items={order.items}
            />
          ))}
        </ul>
      ) : (
        <p>No order history available.</p>
      )}
    </div>
  );
}

export default HistoryView;
