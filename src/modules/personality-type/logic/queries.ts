import { queryOptions } from "@tanstack/react-query";
import { fetchTypeDetail, fetchTypes, fetchTypesByFunction } from "../data/repository";

export const typeQueryKeys = {
  all: ["types"] as const,
  detail: (typeCode: string) => ["types", typeCode] as const,
  byFunction: (functionId: string) => ["types", "by-function", functionId] as const
};

export function typesQueryOptions() {
  return queryOptions({
    queryKey: typeQueryKeys.all,
    queryFn: fetchTypes
  });
}

export function typeDetailQueryOptions(typeCode: string) {
  return queryOptions({
    queryKey: typeQueryKeys.detail(typeCode),
    queryFn: () => fetchTypeDetail(typeCode),
    enabled: Boolean(typeCode)
  });
}

export function typesByFunctionQueryOptions(functionId: string) {
  return queryOptions({
    queryKey: typeQueryKeys.byFunction(functionId),
    queryFn: () => fetchTypesByFunction(functionId),
    enabled: Boolean(functionId)
  });
}
