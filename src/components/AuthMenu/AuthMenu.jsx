const AuthMenu = () => {
  console.log("✅ AuthMenu отрендерен");

  const clickd = () => {
    console.log("Я нажался")
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }
  return (
    <>
      <button
        onClick={clickd}
        type="button"
      >
      ZzZ
      </button>
      <input type="text" onChange={handleChange}/>
    </>
  );
};

export default AuthMenu;



{/*

import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";


const onFinish = () => {
  console.log('Received values of form: ');
};

function handleInput(e: any){
  console.log("gfdgdf", e.target.value)
}

<Form
  name="login"
  initialValues={{remember: true}}
  style={{maxWidth: 360}}
  onFinish={onFinish}
>
  <Form.Item
    name="username"
    rules={[{required: true, message: 'Please input your Username!'}]}
  >
    <Input
      prefix={<UserOutlined />}
      placeholder="Username"
      onChange={handleInput}
    />
  </Form.Item>
  <Form.Item
    name="password"
    rules={[{required: true, message: 'Please input your Password!'}]}
  >
    <Input
      prefix={<LockOutlined />}
      type="password"
      placeholder="Password"
    />
  </Form.Item>

  <Form.Item>
    <Button
      block
      type="primary"
      htmlType="submit"
    >
      Log in
    </Button>
    {/!* or <a href="">Register now!</a>*!/}
  </Form.Item>
</Form>
*/}
