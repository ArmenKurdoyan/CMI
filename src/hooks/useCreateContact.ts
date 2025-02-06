import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "../api/contactApi";

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContact,
    onSuccess: (newContact) => {
      queryClient.setQueryData(["contacts"], (oldContacts: any) => [
        ...(oldContacts || []),
        newContact,
      ]);
    },
  });
};
