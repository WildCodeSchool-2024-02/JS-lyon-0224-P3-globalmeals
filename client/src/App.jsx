import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import NavbarToggle from "./components/navbar/NavbarToggle";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <NavbarToggle />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
