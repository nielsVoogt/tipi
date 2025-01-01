import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import { showNotification } from "@mantine/notifications";
import { supabase } from "../../supabase/client";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

const AddTip = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any>();

  const { getInputProps, onSubmit, values, setFieldValue } = useForm({
    mode: "controlled",
    initialValues: {
      title: "",
      description: "",
      location: "",
      category: "51a8cb94-acd1-4718-8ca5-790531eb1be1",
    },

    validate: {
      title: isNotEmpty("Title is a required field"),
      description: isNotEmpty("Description is a required field"),
      category: isNotEmpty("Description is a required field"),
    },
  });

  const handleSubmit = onSubmit(
    async ({ title, description, location, category }) => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .insert([{ user_id: user?.id, title, description, location, category }])
        .select();

      if (error) {
        console.log("error: ", error);
        return;
      }

      if (data) {
        showNotification({
          message: "Tip toegevoegd",
          withCloseButton: true,
        });
        navigate("/home");
      }
    }
  );

  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      let { data: categories, error } = await supabase
        .from("categories")
        .select("*");

      if (error) {
        console.log("err", error);
      }

      if (categories) {
        setCategories(categories);
      }

      setLoadingCategories(false);
    };

    getCategories();
  }, []);

  const handleCategoryChange = (value: string | null) => {
    if (value) setFieldValue("category", value);
  };

  if (loadingCategories) {
    return <LoadingOverlay visible />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {categories && (
          <Select
            label="Category"
            placeholder="Pick a value"
            onChange={handleCategoryChange}
            data={
              categories &&
              categories.map((category: Category) => category.name)
            }
          />
        )}

        <TextInput {...getInputProps("title")} label="title" />
        <TextInput {...getInputProps("description")} label="description" />
        <TextInput {...getInputProps("location")} label="location" />

        <Button type="submit">Opslaan</Button>
      </form>
    </div>
  );
};

export { AddTip };
