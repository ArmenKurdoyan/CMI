import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useGetContacts } from "../hooks/useGetContacts";

export const ContactList = () => {
  const { data: contacts, isLoading, error } = useGetContacts();
  const [activeContact, setActiveContact] = useState<null | number>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  if (isLoading) return <p>Loading contacts...</p>;
  if (error) return <p>Error loading contacts.</p>;

  const filteredContacts = contacts?.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-64 bg-gray-100 h-full overflow-auto p-4 flex flex-col">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-black w-full p-2 border rounded-md"
        />
      </div>
      <button
        onClick={() => {
          navigate({ to: "/contacts/new" });
          setActiveContact(null);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
      >
        New
      </button>
      <ul className="mt-4">
        {filteredContacts?.map((contact) => (
          <li
            key={contact.id}
            onClick={() => {
              setActiveContact(contact.id);
              navigate({ to: `/contacts/${contact.id}` });
            }}
            className={`p-2 cursor-pointer text-black rounded-md ${
              contact.id === activeContact
                ? "bg-blue-400 text-white"
                : "hover:bg-blue-200"
            }`}
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
