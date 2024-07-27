import { Link } from "react-router-dom";

function SolidButton({ children, type, to }) {
  if (to) {
    return (
      <>
        <Link
          to={to}
          className="flex justify-center items-center text-analytics-azule 
          transition-all ease-in-out duration-300 hover:bg-gigabyte-green 
          font-semibold text-2xl bg-chiper-chartreuse w-full p-2 rounded-lg"
        >
          {children}
        </Link>
      </>
    );
  }

  return (
    <>
      <button
        className="flex justify-center items-center text-analytics-azule 
        transition-all ease-in-out duration-300 hover:bg-gigabyte-green 
        font-semibold text-2xl bg-chiper-chartreuse w-full p-2 rounded-lg"
        type={type}
      >
        {children}
      </button>
    </>
  );
}

export default SolidButton;
