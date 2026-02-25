import typesData from "./types.json";
import { PersonalityType } from "../model/types";

function delayed<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), 80));
}

export async function fetchTypes(): Promise<PersonalityType[]> {
  return delayed(typesData as PersonalityType[]);
}

export async function fetchTypeDetail(typeCode: string): Promise<PersonalityType | null> {
  const normalized = typeCode.toLowerCase();
  const found = (typesData as PersonalityType[]).find((item) => item.id === normalized);
  return delayed(found ?? null);
}

export async function fetchTypesByFunction(functionId: string): Promise<
  {
    type_code: string;
    stack_position: "dominant" | "auxiliary" | "tertiary" | "inferior";
  }[]
> {
  const mapped = (typesData as PersonalityType[]).flatMap((typeItem) =>
    typeItem.stack
      .filter((stackItem) => stackItem.function_id === functionId)
      .map((stackItem) => ({
        type_code: typeItem.type_code,
        stack_position: stackItem.position
      }))
  );
  return delayed(mapped);
}
