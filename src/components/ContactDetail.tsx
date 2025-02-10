import { useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDeleteContact } from "../hooks/useDeleteContact";
import { useGetContacts } from "../hooks/useGetContacts";

export const ContactDetail = () => {
  const { contactId } = useParams({ strict: false });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: contact, isLoading, error } = useGetContacts(contactId);
  const { mutate: deleteContact } = useDeleteContact();

  const [confirmDelete, setConfirmDelete] = useState(false);

  if (isLoading) return <p>Loading contact...</p>;
  if (error) return <p>Error loading contact.</p>;
  if (!contact) return <p>Contact not found.</p>;

  const handleDelete = () => {
    deleteContact(contactId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["contacts"]);
        navigate({ to: "/contacts" });
      },
    });
  };

  const getPhotoAlt = () => {
    const [firstname, lastname] = contact.name.split(" ");
    if (firstname && lastname) {
      return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
    }
    return firstname[0].toUpperCase();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4">
        <div className="rounded w-[45px] h-[45px] bg-red-400 text-center text-white text-2xl font-bold flex items-center justify-center">
          {getPhotoAlt()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black">{contact.name}</h2>
          <p className="text-blue-500 text-black">@{contact.username}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate({ to: `/contacts/edit/${contactId}` })}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => setConfirmDelete(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>

      {confirmDelete && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md text-black">
          <p>Are you sure you want to delete this contact?</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="bg-gray-300 text-white px-4 py-2 rounded-md"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
