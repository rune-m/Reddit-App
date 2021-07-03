interface Props {
  inputField: any;
  label: string;
  id: string;
}

export const StdFormInput = ({ inputField, label, id }: Props) => {
  return (
    <div className='form-floating custom-form mt-2'>
      <input
        {...inputField}
        className='col-12 form-control'
        required
        maxLength={30}
        id={id}
      />
      <label htmlFor={id}>{label}</label>{" "}
    </div>
  );
};
