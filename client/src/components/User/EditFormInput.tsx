interface Props {
  inputField?: any;
  label: string;
  id: string;
  requiredField?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (e: any) => void;
}

export const EditFormInput = ({
  label,
  id,
  requiredField = true,
  defaultValue,
  value,
  inputField,
  onChange,
}: Props) => {
  return (
    <div className='form-floating custom-form mt-2'>
      <input
        {...inputField}
        className='col-12 form-control'
        maxLength={30}
        id={id}
        required={requiredField}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>{" "}
    </div>
  );
};
