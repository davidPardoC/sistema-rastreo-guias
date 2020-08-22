import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./screens/home";
import CreateOrder from "./screens/create-order";
import Register from './screens/register'
export default function App() {
  return (
    <Router>
      <Switch>
      <Route path="/register" component={Register} />
        <Route path="/createOrder" component={CreateOrder} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
