import * as React from "react";

interface Props {
  body: () => JSX.Element;
}

export const FormComponent = ({ body }: Props) => {
  return (
    <>
      <div className='d-flex h-100 justify-content-center align-items-center'>
        <div className='card mt-3 col-12 col-sm-10 col-md-8 col-lg-4'>
          <div className='card-body mt-3'>
            <form>{body()}</form>
          </div>
        </div>
      </div>
    </>
  );
};
