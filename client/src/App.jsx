import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProvider from "./contexts/UserContext";
import Header from "./components/header/Header";
import NavbarToggle from "./components/navbar/NavbarToggle";
import Footer from "./components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
    <div className="app">
      <Header />
      <main className="container">
        <NavbarToggle />
        <Outlet />
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Footer />
      </div>
      </UserProvider>
  );
}

export default App;
