import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar/>
      <Outlet />
      {/* Footer */}
    </div>
  );
}

export default App;

