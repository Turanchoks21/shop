import { Outlet } from "react-router-dom";
import NavBar from "./components/navigations/NavBar";
import ScrollToTop from "./router/ScrollToTop";
import { UsersProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UsersProvider>
        <NavBar />
        <div className="m-0 px-2 lg:px-48">
          <ScrollToTop>
            <Outlet />
          </ScrollToTop>
        </div>
      </UsersProvider>
    </>
  );
}

export default App;
