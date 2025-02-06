import { useQuery } from "@tanstack/react-query";
import { getContacts, getContactById } from "../api/contactApi";

export const useGetContacts = (id?: string) => {
  return useQuery({
    queryKey: id ? ["contacts", id] : ["contacts"],
    queryFn: () => (id ? getContactById(id) : getContacts()),
  });
};
