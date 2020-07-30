import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Register from "./pages/authPages/Register";
import Hall from "./pages/Hall";
import { useAuth } from "./contexts/auth";

const RouteDisconnected = () => (
  <Switch>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/">
      <Login />
    </Route>
  </Switch>
);

const RouteKitchen = () => (
  <Switch>
    <Route path="/register">
      <h1>register</h1>
    </Route>
    <Route exact path="/">
      <h1>Kitchen</h1>
    </Route>
  </Switch>
);

const RouteService = () => (
  <Switch>
    <Route path="/register">
      <h1>register</h1>
    </Route>
    <Route path="/">
      <Hall />
    </Route>
  </Switch>
);

const Routes = () => {
  const { signed, user } = useAuth();
  if (!signed) {
    return <RouteDisconnected />;
  } else if (user.type === "service") {
    return <RouteService />;
  } else {
    return <RouteKitchen />;
  }
};

export default Routes;
