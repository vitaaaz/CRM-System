import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link, Navigate} from "react-router-dom";
import {JSX, useState} from "react";
import {signIn} from "@/api/api";
import {AuthData} from "@/types/authorization";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/state/store";
import {setAuthState} from "@/state/Auth/tokenSlice";
import {tokenStorage} from "@/tokenStorage/tokenStorage";


const AuthorizationForm = (): JSX.Element => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()

  const handleSignIn = async ({login, password}: AuthData) => {
    const signInReqBody = {
      login,
      password,
    }
    try {
      setIsSuccess(false);
      setIsLoading(true);
      const response = await signIn(signInReqBody);

      //сохраняем 2 токена
      tokenStorage.setToken(response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken)

      //меняем состояние авторизации в глобал состоянии
      dispatch(setAuthState(true))
      // dispatch(clearAuthState());

      setIsSuccess(true);
      form.resetFields();
    } catch (error) {
      alert("Неверный данные!")
      console.log(error)
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
    console.log('Произошла отправка формы');
  };

  return (
    <>
      <Form
        name="signIn"
        form={form}
        initialValues={{remember: true}}
        style={{maxWidth: 360}}
        onFinish={handleSignIn}
      >
        <Form.Item
          name="login"
          rules={[{required: true, message: 'Please input your Login!'}]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Login"
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
            disabled={isLoading}
          >
            Log in
          </Button>
          or <Link to='/authorization/registration'>Registration</Link>
        </Form.Item>

      </Form>

      {isSuccess && (
        <Navigate to ='/' />
      )}
    </>
  );
};

export default AuthorizationForm;





