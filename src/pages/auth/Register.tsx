import { Button, TextInput } from "@mantine/core";

import { showNotification } from "@mantine/notifications";
import { supabase } from "../../supabase/client";
import { useForm } from "@mantine/form";

const Register = () => {
  const { getInputProps, onSubmit } = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const handleSubmit = onSubmit(({ email, password }) => {
    supabase.auth
      .signUp({ email, password })
      .then(() => {
        showNotification({
          message: "Gelukt",
          color: "green",
        });
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  });

  return (
    <div className="bg-red-400">
      <form onSubmit={handleSubmit}>
        <TextInput type="email" {...getInputProps("email")} />
        <TextInput type="password" {...getInputProps("password")} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export { Register };
