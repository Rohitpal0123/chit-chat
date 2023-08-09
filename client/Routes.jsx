import { useContext } from "react";
import Register from "./src/Register";
import { UserContext } from "./src/UserContext";

const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (username) {
    return "logged in" + username;
  }

  return <Register />;
};

export default Routes;
