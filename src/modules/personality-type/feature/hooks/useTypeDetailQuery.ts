import { useQuery } from "@tanstack/react-query";
import { typeDetailQueryOptions } from "../../logic/queries";

export function useTypeDetailQuery(typeCode: string) {
  return useQuery(typeDetailQueryOptions(typeCode));
}
