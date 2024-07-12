import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import NavbarToggle from "./components/navbar/NavbarToggle";
import Footer from "./components/Footer/Footer";
import { UserProvider } from "./components/context/UserContext";

function App() {
  return (
   
    <UserProvider>
    <Header />
      <main className="container">
        <NavbarToggle />
        <Outlet />
        <Footer />
      </main>
    </UserProvider>
    
    
  );
}

export default App;
