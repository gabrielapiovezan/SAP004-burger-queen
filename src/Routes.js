import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Register from "./pages/authPages/Register";
import Hall from "./pages/Hall";

import Delivery from "./pages/Delivery/Index";
import OrderHistory from "./pages/OrderHistory/Index";
import Kitchen from "./pages/Kitchen/Index"
import { useAuth } from "./contexts/auth"




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
    <Route path="/orderHistory">
      <OrderHistory />
    </Route>
    <Route exact path="/">
      <Kitchen />
    </Route>
  </Switch>
);

const RouteService = () => (
  <Switch>
    <Route path="/orderHistory">
      <OrderHistory />
    </Route>
    <Route path="/delivery">
      <Delivery />
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
