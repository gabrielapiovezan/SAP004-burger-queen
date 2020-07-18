import React from 'react';
import { isAuthenticated } from "./firebase/auth";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './pages/Login/index';
// import Home from './pages/Home';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => isAuthenticated() ? (<Component {...props} />) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)}
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
      <PrivateRoute path="/app" component={() => <h1>Você está logado</h1>} />
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
