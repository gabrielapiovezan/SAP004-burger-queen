
import React from 'react';
import { BrowserRouter as Router, } from "react-router-dom";
import Routes from './Routes';
import { AuthProvider } from './contexts/auth';
import Header from "./pages/Header/index";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes />
      </AuthProvider>
    </Router>
  );
};

export default App;
