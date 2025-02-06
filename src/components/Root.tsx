import { Outlet } from "@tanstack/react-router";
import { ContactList } from "./ContactList";

export const Root = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-1/4 bg-white border-r p-4">
        <ContactList />
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
