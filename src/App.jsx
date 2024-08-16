import { Outlet } from "react-router-dom";
import NavBar from "./components/navigations/NavBar";
import ScrollToTop from "./router/ScrollToTop";

function App() {
  return (
    <>
      <NavBar />
      <ScrollToTop>
        <div className="m-0 px-2 lg:px-48">
          <Outlet />
        </div>
      </ScrollToTop>
    </>
  );
}

export default App;
