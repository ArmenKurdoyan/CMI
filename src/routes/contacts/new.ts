import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "../../components/ContactForm";

export const Route = createFileRoute("/contacts/new")({
  component: ContactForm,
});
