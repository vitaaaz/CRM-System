import TodoListPage from "./pages/TodoListPage/TodoListPage";
import {Menu} from "antd";
import {MailOutlined} from "@ant-design/icons";
import {Link, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

type Items = {
    key: string
    label: string
    icon: React.JSX.Element
    children: {
      key: string
      label: React.JSX.Element
    }[]
}

function App(): React.JSX.Element {
  const [selectedKey, setSelectedKey] = useState<string>('1');
  const location = useLocation();

  const items: Items[] = [
    {
      key: 'navigation',
      label: 'Navigation',
      icon: <MailOutlined />,
      children: [
        { key: 'home', label: <Link to="/">Home</Link>},
        { key: 'profile', label: <Link to="/profile">Profile</Link> },
      ],
    },
  ]
  useEffect(() => {
      if (location.pathname === '/profile') {
        setSelectedKey('profile');
      } else {
        setSelectedKey('home');
      }
    }, [location.pathname]);

  return (
    <div className="container">
      <Menu
        className="menu-nav"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['navigation']}
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
