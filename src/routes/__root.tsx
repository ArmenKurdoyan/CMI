import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ContactList } from "../components/ContactList";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex h-screen bg-gray-50">
        <aside className="w-1/4 bg-white border-r p-4">
          <ContactList />
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
