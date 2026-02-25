export type StackItem = {
  function_id: string;
  position: "dominant" | "auxiliary" | "tertiary" | "inferior";
};

export type Development = {
  early_stage: string;
  balancing_stage: string;
  mature_stage: string;
};

export type Grip = {
  trigger: string;
  behaviors: string[];
  recovery: string;
};

export type InteractionMisunderstanding = {
  appearance: string;
  intention: string;
};

export type PersonalityType = {
  id: string;
  type_code: string;
  stack_summary: string;
  stack: StackItem[];
  processing_flow: string[];
  development: Development;
  grip: Grip;
  interaction_misunderstandings: InteractionMisunderstanding[];
};
