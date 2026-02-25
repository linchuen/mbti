import functionsData from "./functions.json";
import { CognitiveFunction } from "../model/types";

function delayed<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), 80));
}

export async function fetchFunctions(): Promise<CognitiveFunction[]> {
  return delayed(functionsData as CognitiveFunction[]);
}

export async function fetchFunctionDetail(id: string): Promise<CognitiveFunction | null> {
  const list = (functionsData as CognitiveFunction[]).find((item) => item.id === id);
  return delayed(list ?? null);
}
