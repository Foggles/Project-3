import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import PlayPage from "./pages/PlayPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <ProtectedRoute exact path="/characters">
          <CharacterPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/play">
          <PlayPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
