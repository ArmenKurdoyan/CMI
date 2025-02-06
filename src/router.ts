import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { Root } from "./components/Root";
import { ContactDetail } from "./components/ContactDetail";
import { ContactForm } from "./components/ContactForm";

const rootRoute = createRootRoute({
  component: Root,
});

const contactsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contacts/$contactId",
  component: ContactDetail,
});

const contactEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contacts/$contactId/edit",
  component: ContactForm,
});

const contactNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contacts/new",
  component: ContactForm,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    contactsRoute,
    contactEditRoute,
    contactNewRoute,
  ]),
});
