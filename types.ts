export interface GrafcetAction {
  type: 'N' | 'S' | 'C' | 'D' | 'L' | ''; // Normal, Set, Conditional, Delayed, Limited, etc.
  content: string[];
  condition?: string; // For conditional actions
}

export interface GrafcetStep {
  id: string;
  stepNumber: string;
  type: 'initial' | 'regular' | 'macro_entry' | 'macro_exit';
  x: number;
  y: number;
  actions?: GrafcetAction[];
}

export interface GrafcetTransition {
  id: string;
  from: string | string[]; // Single ID or array for convergence
  to: string | string[];   // Single ID or array for divergence
  condition: string;
  x: number;
  y: number;
  type?: 'simple' | 'divergence_or' | 'convergence_or' | 'divergence_and' | 'convergence_and';
  labelPos?: 'right' | 'left';
}

export interface GrafcetLink {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'vertical' | 'elbow';
}

export interface GrafcetData {
  title: string;
  description: string;
  steps: GrafcetStep[];
  transitions: GrafcetTransition[];
  links: GrafcetLink[];
  viewBox: string;
}