import {Outlet} from "react-router-dom";
import './authorization.css'


const AuthLayouts = () => {
  return (
    <main className="authorization">
      <Outlet/>
    </main>
  );
};

export default AuthLayouts;