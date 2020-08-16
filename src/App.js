import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { AuthProvider } from "./contexts/auth";
import Header from "./pages/Header/index";
//import Header2 from "./pages/Header2/index";
//import Menu from "./components/Menu/Index";
import Footer from "./pages/Footer/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes />
        </AuthProvider>
        <ToastContainer position="top-center" />
        <Footer />
      </Router>
    </>
  );
};

export default App;
