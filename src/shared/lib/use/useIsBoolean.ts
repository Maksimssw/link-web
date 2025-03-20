import { useState } from 'react';

interface UseIsBooleanProps {
  boolean: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  set: (value: boolean) => void;
}

export const useIsBoolean = (init: boolean = false): UseIsBooleanProps => {
  const [boolean, setBoolean] = useState(init);

  const set = (bool: boolean): void => {
    setBoolean(bool);
  };

  const setTrue = (): void => {
    setBoolean(true);
  };

  const setFalse = (): void => {
    setBoolean(false);
  };

  const toggle = (): void => {
    setBoolean(!boolean);
  };

  return { boolean, setTrue, setFalse, toggle, set };
};
