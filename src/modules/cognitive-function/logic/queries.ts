import { queryOptions } from "@tanstack/react-query";
import { fetchFunctionDetail, fetchFunctions } from "../data/repository";

export const functionQueryKeys = {
  all: ["functions"] as const,
  detail: (id: string) => ["functions", id] as const
};

export function functionsQueryOptions() {
  return queryOptions({
    queryKey: functionQueryKeys.all,
    queryFn: fetchFunctions
  });
}

export function functionDetailQueryOptions(id: string) {
  return queryOptions({
    queryKey: functionQueryKeys.detail(id),
    queryFn: () => fetchFunctionDetail(id),
    enabled: Boolean(id)
  });
}
