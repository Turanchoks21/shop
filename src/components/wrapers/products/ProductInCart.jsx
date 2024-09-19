import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

function ProductInCart({ id, name, price }) {
  const { updateProductCount, removeFromCart, cart } = useContext(CartContext);

  const product = cart.find((item) => item.id === id);
  const itemCount = product ? product.count : 1;

  const handleIncrease = () => {
    console.log("Increase button clicked for id:", id);
    updateProductCount(id, itemCount + 1);
  };

  const handleDecrease = () => {
    console.log("Decrease button clicked for id:", id);
    if (itemCount > 1) {
      updateProductCount(id, itemCount - 1);
    }
  };

  const handleRemove = () => {
    console.log("Remove button clicked for id:", id);
    removeFromCart(id);
  };

  return (
    <div className="bg-white rounded-lg w-full flex justify-between p-4">
      <div className="flex space-x-4">
        <div className="h-20 w-20 border flex justify-center items-center">
          <img
            className="h-20 w-20"
            src={`https://8ybg5l.realhost-free.net/Product/GetImage?productId=${id}`}
          />
        </div>
        <div className="flex flex-col">
          <span>{name}</span>
          <span>{price}</span>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-4">
        <div>
          <button
            className="bg-red-500 hover:bg-red-500/90 p-1 rounded-lg"
            onClick={handleRemove}
          >
            <TrashIcon className="h-6 text-white" />
          </button>
        </div>
        <div className="text-black border p-1 bg-gray-100 rounded-lg flex items-center justify-between space-x-2">
          <button onClick={handleIncrease}>
            <PlusIcon className="h-5 cursor-pointer" />
          </button>
          <div className="border bg-white w-6 rounded-lg outline-none text-center">
            {itemCount}
          </div>
          <button onClick={handleDecrease}>
            <MinusIcon className="h-5 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInCart;
