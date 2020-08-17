import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./screens/home";
import CreateOrder from "./screens/create-order";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/createOrder" component={CreateOrder} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
