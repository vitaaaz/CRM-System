import {useSelector} from "react-redux";
import {RootState} from "@/state/store";


const testToken = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);

  return (
    <div>
      <p>Access {localStorage.getItem('token')}</p>
      <p>Refresh {refreshToken}</p>
    </div>
  );
};

export default testToken;