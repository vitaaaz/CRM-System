import TodoListPage from "./pages/TodoListPage/TodoListPage";
import {Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import MainLayouts from "@/layouts/MainLayouts/MainLayouts";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import AuthLayouts from "@/layouts/AuthLayouts/AuthLayouts";
import AuthorizationPage from "@/pages/AuthorizationPage/AuthorizationPage";
import RegistrationPage from "@/pages/RegistrationPage/RegistrationPage";

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayouts/>}>
        <Route index element={<TodoListPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Route>
      <Route path="/authorization" element={<AuthLayouts/>}>
        <Route index element={<AuthorizationPage/>}/>
        <Route path="registration" element={<RegistrationPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
