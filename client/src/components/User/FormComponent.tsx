import * as React from "react";

interface Props {
  body: () => JSX.Element;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormComponent = ({ body, onSubmit }: Props) => {
  return (
    <>
      <div className='d-flex h-100 justify-content-center align-items-center'>
        <div className='card mt-3 col-12 col-sm-10 col-md-8 col-lg-4'>
          <div className='card-body mt-3'>
            <form onSubmit={onSubmit}>{body()}</form>
          </div>
        </div>
      </div>
    </>
  );
};
