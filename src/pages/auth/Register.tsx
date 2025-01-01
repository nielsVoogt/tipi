import { Button, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

import { showNotification } from "@mantine/notifications";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { getInputProps, onSubmit } = useForm({
    mode: "uncontrolled",
    initialValues: {
      user_name: "",
      email: "",
      password: "",
    },

    validate: {
      user_name: isNotEmpty("Email is a required field"),
      password: isNotEmpty("Password is a required field"),
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const handleSubmit = onSubmit(async ({ email, password, user_name }) => {
    setLoading(true);

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name,
          },
        },
      });

      if (error) setErrorMessage(error.message);

      if (data) {
        navigate("/login");
        showNotification({
          title: "Sign up succesfull",
          message: "Please confirm your email adress",
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }

    setLoading(false);
  });

  return (
    <div className="bg-red-400">
      <form onSubmit={loading ? undefined : handleSubmit}>
        <TextInput type="email" {...getInputProps("email")} label="email" />
        <TextInput
          type="password"
          {...getInputProps("password")}
          label="password"
        />
        <TextInput {...getInputProps("user_name")} label="username" />

        {errorMessage}
        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export { Register };
