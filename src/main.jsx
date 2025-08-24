import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {StrictMode} from "react";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {path: "/home", element: <App/>},
  {path: "/profile", element: <Profile/>},
])


createRoot(document.getElementById('root')).render(
<StrictMode>
  <RouterProvider router={router} />
</StrictMode>
)
