import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";

import { supabase } from "../../supabase/client";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const InviteMember = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const searchUser = async (q: string) => {
    const { data, error } = await supabase
      .from("user_profile")
      .select()
      .textSearch("user_name", `'${q}'`);

    console.log(data);
  };

  useEffect(() => {
    searchUser(query);
  }, [query]);

  const handleOnQueryChange = useCallback((event: any) => {
    console.log(event);
    setQuery(event.currentTarget.value);
  }, []);

  return (
    <div>
      {query}
      <TextInput value={query} onChange={handleOnQueryChange} />
    </div>
  );
};

export { InviteMember };
