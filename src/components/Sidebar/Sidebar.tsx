import {Menu} from "antd";
import {MailOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
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

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState<string>('home');
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
    <>
      <Menu
        className="menu-nav"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['navigation']}
        mode="inline"
        theme="dark"
        items={items}
      />
    </>
  );
};

export default Sidebar;