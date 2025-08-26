import TodoListPage from "./pages/TodoListPage";
import {Menu} from "antd";
import {MailOutlined} from "@ant-design/icons";
import {Link, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile";

function App() {

  const items = [
    {
      key: 'sub1',
      label: 'Navigation',
      icon: <MailOutlined />,
      children: [
        { key: '1', label: <Link to="/">Home</Link>},
        { key: '2', label: <Link to="/profile">Profile</Link> },
      ],
    },
  ]

  return (
    <div className="container">
      <Menu
        className="menu-nav"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
      />
      <div style={{ flex: 1, padding: '24px' }}>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

    </div>
  )
}

export default App
