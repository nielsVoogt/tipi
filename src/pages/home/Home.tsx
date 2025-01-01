import { Button } from "@mantine/core";
import { useAuth } from "../../context/AuthProvider";

const Home = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      You are logged in and your email address is {user?.email}
      <Button onClick={handleLogout}>LogOut</Button>
    </div>
  );
};

export default Home;
