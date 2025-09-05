import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import {StrictMode} from "react";

/*const router = createBrowserRouter([
  {path: "/", element: <TodoListPage/>},
  {path: "/profile", element: <Profile/>},
])*/


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/*<RouterProvider router={router} />*/}
    </BrowserRouter>
  </StrictMode>

)
