import {useEffect, useState} from "react";
import {userProfile} from "@/api/api";

const UserProfile = () => {
  const [userName, setUserName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)

  useEffect(() => {
    userProfile()
      .then(res => {
        setUserName(res.data.username)
        setEmail(res.data.email)
        setPhoneNumber(res.data.phoneNumber)
      })
  }, []);

  return (
    <ul>
      <li>Имя пользователя: {userName}</li>
      <li>Почтовый адрес: {email}</li>
      <li>Телефон: {phoneNumber}</li>
    </ul>
  );
};

export default UserProfile;