import type { Dispatch, SetStateAction } from 'react';

export interface StepperProps {
  handleBack?: () => void;
  handleNext?: () => void;
  handleReset?: () => void;
  setStepErrors: Dispatch<SetStateAction<boolean[]>>;
  stepIndex: number;
}
