import { useQuery } from "@tanstack/react-query";
import { functionsQueryOptions } from "../../logic/queries";

export function useFunctionsQuery() {
  return useQuery(functionsQueryOptions());
}
