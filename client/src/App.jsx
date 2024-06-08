import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import Continents from "./components/continents/Continents";

function App() {
  return (
    <>
      <Header />
      <h1>NavBar</h1>
      <main className="container">
        <Continents />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
