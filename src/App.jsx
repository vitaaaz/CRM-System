import TodoListPage from "./pages/TodoListPage";
import {Menu} from "antd";
import {MailOutlined} from "@ant-design/icons";

function App() {

  const items = [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        { key: '5', label: 'Home' },
        { key: '6', label: 'Profile' },
      ],
    },
  ]

  return (
    <div className="container">
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
      />
      <div className="">
        <h1>Список задач</h1>
        <TodoListPage/>
      </div>

    </div>
  )
}

export default App
