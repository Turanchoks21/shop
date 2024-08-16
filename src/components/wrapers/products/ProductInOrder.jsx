import { useTranslation } from "react-i18next";

function ProductInOrder({ id, name, category, price, imageId, count }) {
  const totalPrice = price * count;
  const { t } = useTranslation();

  return (
    <div className="flex justify-between rounded-lg shadow-xl p-2">
      <div className="flex space-x-4">
        <div className="h-32 w-32 border rounded-lg flex justify-center items-center">
          Image
        </div>
        <div className="flex flex-col">
          <div>{name}</div>
          <div>{category}</div>
          <div>
            {t("count")}: {count}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-xl">{totalPrice.toFixed(2)}</div>
        <div className="text-md">
          {t("perOne")} {price}
        </div>
      </div>
    </div>
  );
}

export default ProductInOrder;
