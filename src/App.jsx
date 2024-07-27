import { Outlet } from "react-router-dom";
import NavBar from "./components/navigations/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="m-0 px-5 lg:px-48">
        <Outlet />
      </div>
    </>
  );
}

export default App;
