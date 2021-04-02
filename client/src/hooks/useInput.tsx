import React, { useState } from "react";

export const useInput = (
  type: string,
  placeholder: string,
  initValue?: string
) => {
  const [value, setValue] = useState(initValue ? initValue : "");

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    setValue("");
  };

  return {
    type,
    value,
    placeholder,
    onSubmit,
    onChange,
  };
};
