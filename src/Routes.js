import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Register from "./pages/authPages/Register";
import Hall from "./pages/Hall//Hall";
import Delivery from "./pages/Delivery/Index";
import OrderHistory from "./pages/OrderHistory/Index";
import Kitchen from "./pages/Kitchen/Index";
import { useAuth } from "./contexts/auth";

const RouteDisconnected = () => (
  <Switch>
    <Route path="/register" exact>
      <Register />
    </Route>
    <Route path="/" exact>
      <Login />
    </Route>
    <Redirect to="/" />
  </Switch>
);

const RouteKitchen = () => (
  <Switch>
    <Route path="/orderHistory" exact >
      <OrderHistory />
    </Route>
    <Route exact path="/" exact>
      <Kitchen />
    </Route>
    <Redirect to="/" />
  </Switch>
);

const RouteService = () => (
  <Switch>
    <Route path="/orderHistory" exact>
      <OrderHistory />
    </Route>
    <Route path="/hall" exact>
      <Hall />
    </Route>
    <Route path="/" exact>
      <Delivery />
    </Route>
    <Redirect to="/" />
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
