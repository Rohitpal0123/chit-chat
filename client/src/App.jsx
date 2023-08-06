import Register from "./Register";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://192.168.0.174:4000";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Register />
    </>
  );
}

export default App;
