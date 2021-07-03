interface Props {
  inputField: any;
  label: string;
  id: string;
  requiredField?: boolean;
}

export const StdFormInput = ({
  inputField,
  label,
  id,
  requiredField = true,
}: Props) => {
  return (
    <div className='form-floating custom-form mt-2'>
      <input
        {...inputField}
        className='col-12 form-control'
        maxLength={30}
        id={id}
        required={requiredField}
      />
      <label htmlFor={id}>{label}</label>{" "}
    </div>
  );
};
