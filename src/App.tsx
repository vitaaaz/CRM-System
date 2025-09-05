import TodoListPage from "./pages/TodoListPage/TodoListPage";
import {Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import MainLayouts from "@/layouts/MainLayouts/MainLayouts";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainLayouts/>}>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Route>
    </Routes>
  )
}

export default App
