import { Button, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { getInputProps, onSubmit } = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isNotEmpty("Email is a required field"),
      password: isNotEmpty("Password is a required field"),
    },
  });

  const handleSubmit = onSubmit(async ({ email, password }) => {
    try {
      setLoading(true);

      const {
        data: { user, session },
        error,
      } = await login(email, password);

      if (error) setErrorMessage(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      setErrorMessage("Email or Password Incorrect");
    }
    setLoading(false);
  });

  return (
    <div className="bg-red-400">
      <form onSubmit={loading ? undefined : handleSubmit}>
        <TextInput type="email" {...getInputProps("email")} />
        <TextInput type="password" {...getInputProps("password")} />

        {errorMessage && errorMessage}

        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export { Login };
