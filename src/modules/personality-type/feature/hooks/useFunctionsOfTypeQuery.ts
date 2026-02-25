import { useQuery } from "@tanstack/react-query";
import { fetchTypeDetail } from "../../data/repository";
import { fetchFunctions } from "../../../cognitive-function/data/repository";

export function useFunctionsOfTypeQuery(typeCode: string) {
  return useQuery({
    queryKey: ["types", typeCode, "functions"],
    enabled: Boolean(typeCode),
    queryFn: async () => {
      const [typeDetail, functions] = await Promise.all([fetchTypeDetail(typeCode), fetchFunctions()]);
      if (!typeDetail) return [];
      return typeDetail.stack.map((stackItem) => ({
        position: stackItem.position,
        function_id: stackItem.function_id,
        function_name: functions.find((fn) => fn.id === stackItem.function_id)?.name ?? stackItem.function_id
      }));
    }
  });
}
