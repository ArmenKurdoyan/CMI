import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContact } from "../api/contactApi";

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["contacts"], (oldContacts: any) =>
        oldContacts ? oldContacts.filter((c: any) => c.id !== +deletedId) : []
      );
    },
  });
};
