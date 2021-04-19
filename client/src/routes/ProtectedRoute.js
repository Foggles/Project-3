import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ children, ...rest }) {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user_data", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 200) {
          throw resp.statusText;
        }
        return resp.json();
      })
      .then((respUser) => {
        setUser(respUser);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
