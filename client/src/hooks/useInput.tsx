import React, { useState } from "react";

export const useInput = (type: string, placeholder: string) => {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
