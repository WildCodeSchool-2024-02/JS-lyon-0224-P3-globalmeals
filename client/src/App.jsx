import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <header>
        <Header />
        <h1>NavBar</h1>
      </header>
      <main className="container">
        <Footer />
      </main>
    </>
  );
}

export default App;
