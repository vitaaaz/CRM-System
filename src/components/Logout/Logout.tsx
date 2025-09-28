import {Button} from "antd";
import {logout} from "@/api/api";
import {useNavigate} from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const exitSistem = async() => {
    try {
      await logout()
      navigate("/authorization");
    }
    catch(error) {
      alert(error)
      navigate("/authorization");
    }
  }

  return (
    <Button
      type="primary"
      className="inner-button edit-button"
      onClick={exitSistem}
    >
      Выйти
    </Button>
  );
};

export default Logout;