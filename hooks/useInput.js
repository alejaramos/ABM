import { useState } from "react";

const useInput = (data) => {
  const [value, setValue] = useState(data||"");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return { value, onChange };
};

export default useInput;