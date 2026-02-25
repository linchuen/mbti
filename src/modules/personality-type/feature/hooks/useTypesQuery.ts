import { useQuery } from "@tanstack/react-query";
import { typesQueryOptions } from "../../logic/queries";

export function useTypesQuery() {
  return useQuery(typesQueryOptions());
}
