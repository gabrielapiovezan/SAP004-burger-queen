import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { AuthProvider } from "./contexts/auth";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
};

export default App;
