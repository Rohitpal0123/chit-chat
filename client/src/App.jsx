import Register from "./Register";
import axios from "axios";

function App() {
  axios.default.baseURL = "http://localhost:4000";
  axios.default.withCredentials = true;

  return (
    <>
      <Register />
    </>
  );
}

export default App;
