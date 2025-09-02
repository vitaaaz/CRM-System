import TodoListPage from "./pages/TodoListPage/TodoListPage";
import {Menu} from "antd";
import {MailOutlined} from "@ant-design/icons";
import {Link, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function App() {
  const [selectedKey, setSelectedKey] = useState('1');
  const location = useLocation();

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
  useEffect(() => {
      if (location.pathname === '/profile') {
        setSelectedKey('2');
      } else {
        setSelectedKey('1');
      }
    }, [location.pathname]);

  return (
    <div className="container">
      <Menu
        className="menu-nav"
        selectedKeys={[selectedKey]}
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
