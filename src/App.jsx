import { Outlet } from "react-router-dom";
import NavBar from "./components/navigations/NavBar";
import ScrollToTop from "./router/ScrollToTop";
import UserNavBar from "./components/navigations/UserNavBar";
import { useUsers } from "./context/UserContext";

function App() {
  const { users } = useUsers();

  return (
    <>
      {users.length > 0 ? <UserNavBar /> : <NavBar />}
      <ScrollToTop>
        <div className="m-0 px-2 lg:px-48">
          <Outlet />
        </div>
      </ScrollToTop>
    </>
  );
}

export default App;
