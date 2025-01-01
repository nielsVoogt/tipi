import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import { showNotification } from "@mantine/notifications";
import { supabase } from "../../supabase/client";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { getInputProps, onSubmit } = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
    },

    validate: {
      name: isNotEmpty("Title is a required field"),
    },
  });

  const handleSubmit = onSubmit(async ({ name }) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("groups")
      .insert([{ name: name, admin_id: user?.id }])
      .select();

    if (error) {
      console.log("error: ", error);
      setLoading(false);
      return;
    }

    if (data) {
      showNotification({
        message: "Groep toegevoegd",
        withCloseButton: true,
      });
      navigate("/home");
    }
  });

  return (
    <div>
      <form onSubmit={loading ? undefined : handleSubmit}>
        <TextInput {...getInputProps("name")} label="title" />

        <Button type="submit" loading={loading}>
          Nieuwe groep aanmaken
        </Button>
      </form>
    </div>
  );
};

export { CreateGroup };
