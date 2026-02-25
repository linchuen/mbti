import { useQuery } from "@tanstack/react-query";
import { functionDetailQueryOptions } from "../../logic/queries";

export function useFunctionDetailQuery(id: string) {
  return useQuery(functionDetailQueryOptions(id));
}
