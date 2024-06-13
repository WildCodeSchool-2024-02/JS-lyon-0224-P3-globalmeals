import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import NavbarToggle from "./components/navbar/NavbarToggle";
import Footer from "./components/Footer/Footer";
import Continents from "./components/continents/Continents";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <NavbarToggle />
        <Continents />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default App;
