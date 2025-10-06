import Logout from "@/components/Logout/Logout";
import UserProfile from "@/components/UserProfile/UserProfile";

const Profile = () => {
  return (
    <div className="container-todo">
      <h1>
        Профиль
      </h1>
      <Logout/>
      <UserProfile/>
    </div>

  );
};

export default Profile;