import { Link } from "react-router-dom";

function NavButton({ children, to }) {
  if (to) {
    return (
      <>
        <Link
          to={to}
          className="text-chiper-chartreuse font-semibold text-lg px-1 transition-all 
            ease-in-out duration-100 hover:bg-clip-text hover:bg-gradient-to-r hover:from-gigabyte-green 
          hover:via-lottie-lavender hover:to-chiper-chartreuse hover:text-transparent
            hover:font-semibold hover:-translate-y-[2px]"
        >
          {children}
        </Link>
      </>
    );
  }

  return (
    <>
      <button
        className="text-chiper-chartreuse font-semibold text-lg px-1 transition-all 
          ease-in-out duration-100 hover:bg-clip-text hover:bg-gradient-to-r hover:from-gigabyte-green 
        hover:via-lottie-lavender hover:to-chiper-chartreuse hover:text-transparent
          hover:font-semibold hover:-translate-y-[2px]"
      >
        {children}
      </button>
    </>
  );
}

export default NavButton;
