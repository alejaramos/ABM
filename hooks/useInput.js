import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return { value, onChange };
};

export default useInput;