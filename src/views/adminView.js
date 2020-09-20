import React, { useState, useEffect } from "react";

//componentes
import MainScreenAdmin from "../screens/adminScreens/main-screen-admin";
import AdminSettings from "../screens/adminScreens/settingsAdmin";
import AdminSucursales from "../screens/adminScreens/adminSucursales";
import AdminClients from "../screens/adminScreens/adminClient";

//Router
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

//Firebase Import
import { auth } from "../assets/firebase";

export default function AdminView() {
  const [router, setRouter] = useState(false);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        user.getIdTokenResult().then((tokenResult) => {
          if (tokenResult.claims.role === "admin") {
            setRouter(true);
          } else {
            history.push("/");
          }
        });
      } else {
        history.push("/");
      }
    });
  }, [history]);
  const match = useRouteMatch();
  return (
    <div>
      {router && (
 
          <Switch>
            <Route
              path={`${match.path}/settings/adminClients`}
              component={AdminClients}
            />
            <Route
              path={`${match.path}/settings/adminSucursales`}
              component={AdminSucursales}
            />
            <Route path={`${match.path}/settings`} component={AdminSettings} />
            <Route path="" component={MainScreenAdmin} />
          </Switch>

      )}
    </div>
  );
}
