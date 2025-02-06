import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editContact } from "../api/contactApi";

export const useEditContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editContact,
    onSuccess: (updatedContact) => {
      queryClient.setQueryData(["contacts"], (oldContacts: any) =>
        oldContacts.map((c: any) =>
          c.id === updatedContact.id ? updatedContact : c
        )
      );
    },
  });
};
