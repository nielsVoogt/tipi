import { Button } from "@mantine/core";
import { supabase } from "../../supabase/client";
import { useAuth } from "../../context/AuthProvider";
import { useEffect } from "react";

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

  useEffect(() => {
    const getPosts = async () => {
      let { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user?.id);

      console.log(posts);
    };

    getPosts();
  }, []);

  useEffect(() => {
    const getGroups = async () => {
      let { data: posts, error } = await supabase
        .from("groups")
        .select("*")
        .eq("admin_id", user?.id);

      console.log(posts);
    };

    getGroups();
  }, []);

  return (
    <div>
      You are logged in and your email address is {user?.email}
      <div>{user?.user_metadata.user_name}</div>
      <Button onClick={handleLogout}>LogOut</Button>
    </div>
  );
};

export default Home;
