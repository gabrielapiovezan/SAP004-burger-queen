import React from "react";
import { isAuthenticated } from "./firebase/auth";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Register from "./pages/authPages/Register";
import Hall from "./pages/Hall";
// import Register from "./pages/Register/index";
// import Login from "./pages/Login/index";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

// const Routes = () => (
//   <BrowserRouter>
//     <Switch>
//       <Route exact path="/" component={() => <h1>hello world</h1>} />
//       <PrivateRoute path="/app" component={() => <h1>Você está logado</h1>} />
//     </Switch>
//   </BrowserRouter>
// );

const App = () => {
  return (
    <Switch>
      <Route path="/hall">
        <Hall />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <PrivateRoute path="/app" component={() => <h1>Você está logado</h1>} />
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  );
};

export default App;
