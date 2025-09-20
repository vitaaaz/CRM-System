import {Alert, Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {JSX, useState} from "react";
import {signIn} from "@/api/api";
import type {ReactNode} from "react";
import {AuthData} from "@/types/authorization";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/state/store";
import {setToken} from "@/state/token/tokenSlice";

const AuthorizationForm = (): JSX.Element => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()
/*  const token = useSelector((state: RootState) => ({
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken,
  }));*/

  const successMessage: ReactNode = (
    <>
      <p>Вы успешно авторизовались!</p>
      <p>Нажмите чтобы перейти на главную страницу</p>
      <Link to="/">Sign In</Link>
    </>
  );


  const handleSignIn = async ({login, password}: AuthData) => {
    const signInReqBody = {
      login,
      password,
    }
    try {
      setIsSuccess(false);
      setIsLoading(true);
      const response = await signIn(signInReqBody);
      //закидываем 2 токена в глобальное состояние
      dispatch(setToken({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }))
      //сохраняем токен доступа access в localstorage
      localStorage.setItem('token', response.data.accessToken)

      console.log(response)
      console.log(response.data);
      console.log(localStorage.getItem('token'))

      setIsSuccess(true);
      form.resetFields();
    } catch (error) {
      alert(error)
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
        <Alert
          message="Success"
          description={successMessage}
          type="success"
          showIcon
          style={{width: '100%'}}
        />
      )}

    </>
  );
};

export default AuthorizationForm;





