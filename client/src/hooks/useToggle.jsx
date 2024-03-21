import { useState, useCallback } from "react";

const useToggle = (initialState = false) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(() => setIsToggled((prevState) => !prevState), []);

  const close = useCallback(() => setIsToggled(false), []);

  return [isToggled, toggle, close];
};

export default useToggle;
