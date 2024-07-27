import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link
        to="/"
        className="bg-clip-text text-transparent bg-gradient-to-r from-gigabyte-green
       via-chiper-chartreuse to-gigabyte-green"
      >
        <div className="font-bold text-2xl xxl:text-4xl 3xl:text-6xl 5xl:text-7xl">
          Game Start
        </div>
      </Link>
    </>
  );
}

export default Logo;
