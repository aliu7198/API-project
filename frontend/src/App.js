import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList";
import SpotDetailsPage from "./components/SpotDetailsPage";
import CreateSpotForm from "./components/SpotForm/CreateSpotForm";
import UserSpotsList from "./components/UserSpotsList";
import UpdateSpot from "./components/SpotForm/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotsList />
          </Route>
          <Route exact path="/spots/current">
            <UserSpotsList />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetailsPage />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <UpdateSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
