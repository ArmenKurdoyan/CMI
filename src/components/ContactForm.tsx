import { useForm } from "@tanstack/react-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useGetContacts } from "../hooks/useGetContacts";
import { useCreateContact } from "../hooks/useCreateContact";
import { useEditContact } from "../hooks/useEditContact";
import { z } from "zod";
import { useEffect } from "react";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
});

export const ContactForm = () => {
  const { contactId } = useParams({ strict: false });
  const navigate = useNavigate();
  const isEditing = !!contactId;

  const { data: contact, isLoading } = useGetContacts(contactId);
  const { mutate: createContact } = useCreateContact();
  const { mutate: editContact } = useEditContact();

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
    },
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      if (isEditing) {
        editContact(
          { id: contactId, ...values },
          {
            onSuccess: () => navigate({ to: `/contacts/${contactId}` }),
          }
        );
      } else {
        createContact(values, {
          onSuccess: (newContact) =>
            navigate({ to: `/contacts/${newContact.id}` }),
        });
      }
    },
  });

  useEffect(() => {
    if (isEditing && contact) {
      form.setFieldValue("name", contact.name);
      form.setFieldValue("username", contact.username);
    }
  }, [contact, isEditing, form]);

  if (isEditing && isLoading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-black">
        {isEditing ? "Edit Contact" : "New Contact"}
      </h2>
      <form onSubmit={form.handleSubmit} className="mt-4 space-y-4">
        <form.Field name="name">
          {(field) => (
            <div>
              <label className="block font-medium text-black">Name</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 border rounded-md border-black text-black"
              />
              {field.state.meta.isTouched && field.state.meta.errors.length && (
                <p className="text-red-500">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="username">
          {(field) => (
            <div>
              <label className="block font-medium text-black">Username</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-2 border rounded-md border-black text-black"
              />
              {field.state.meta.isTouched && field.state.meta.errors.length && (
                <p className="text-red-500">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/contacts" })}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
