import { useQuery } from "@tanstack/react-query";
import { typesByFunctionQueryOptions } from "../../logic/queries";

export function useTypesByFunctionQuery(functionId: string) {
  return useQuery(typesByFunctionQueryOptions(functionId));
}
