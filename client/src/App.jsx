import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import Connexion from "./components/formulaire/connexion";

function App() {
  return (
    <>
      <Header />
      <h1>NavBar</h1>
      < Connexion />
      <main className="container">
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default App;
