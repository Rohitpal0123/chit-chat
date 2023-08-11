import { useContext } from "react";
import { UserContext } from "./src/UserContext";
import RegisterAndLoginForm from "./src/RegisterAndLoginForm";

const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (username) {
    return "logged in" + username;
  }

  return <RegisterAndLoginForm />;
};

export default Routes;
