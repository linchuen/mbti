export type FunctionConflict = {
  target_function: string;
  reason: string;
};

export type FunctionMisunderstanding = {
  appearance: string;
  reason: string;
};

export type FunctionStressPattern = {
  description: string;
  behaviors: string[];
};

export type CognitiveFunction = {
  id: string;
  name: string;
  function_axis: string;
  short_summary: string;
  keyword: string[];
  essence: string;
  decision_flow: string[];
  daily_manifestations: string[];
  misunderstandings: FunctionMisunderstanding[];
  stress_pattern: FunctionStressPattern;
  conflicts: FunctionConflict[];
};
