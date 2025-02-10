import { createFileRoute } from "@tanstack/react-router";
import { ContactDetail } from "../../components/ContactDetail";

export const Route = createFileRoute("/contacts/$contactId")({
  component: ContactDetail,
});
