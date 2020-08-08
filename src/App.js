import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { AuthProvider } from "./contexts/auth";
import Header from "./pages/Header/index";
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
          <Footer />
        </AuthProvider>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
