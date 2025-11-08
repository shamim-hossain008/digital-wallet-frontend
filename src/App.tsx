import { Outlet } from "react-router-dom";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return <>
    <CommonLayout>
      <Outlet/>
    </CommonLayout>
  </>;
}

export default App;
