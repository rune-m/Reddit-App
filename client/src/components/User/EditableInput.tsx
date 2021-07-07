import React, { useState } from "react";

export const EditableInput = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [buttonLabel, setButtonLabel] = useState<string>("Edit");
  const [value, setValue] = useState<string>("asd@asd.com");

  const edit = () => {
    console.log("old mode", editMode, !editMode);
    setEditMode(!editMode);
    console.log("new mode", editMode);
    setButtonLabel(buttonLabel === "Edit" ? "Update" : "Edit");
  };

  return (
    <>
      {editMode ? (
        <div>
          <input
            value={value}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setValue(e.target.value)}
          ></input>
        </div>
      ) : (
        <div>
          <p>asd@asd.com</p>
        </div>
      )}
      <button onClick={edit}>{buttonLabel}</button>
    </>
  );
};
