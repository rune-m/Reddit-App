import * as React from "react";

interface Props {
  body: () => JSX.Element;
  title: string;
}

export const FormComponent = ({ body, title }: Props) => {
  return (
    <>
      <h1 className='p-0 mt-4 mb-3'>{title}</h1>
      <div className='d-flex h-100 justify-content-center align-items-center'>
        <div className='card mt-3 col-12 col-sm-10 col-md-8 col-lg-6'>
          <div className='card-body'>
            <form>{body()}</form>
          </div>
        </div>
      </div>
    </>
  );
};
