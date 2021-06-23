import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";

export const NavbarTop = () => {
  return (
    <div>
      {/* <ul className='nav me-auto'>
        <li className='nav-item'>
          <a className='nav-link p-0 active' aria-current='page' href='/'>
            <h1>Post App</h1>
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='login'>
            Login
          </a>
        </li>
      </ul> */}

      <Navbar
        collapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
        className='mt-3'
      >
        <Navbar.Brand href='/'>
          <h1>PostApp</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {/* <Nav.Link href='#features'>Features</Nav.Link> */}
          </Nav>
          <Nav className='ms-auto'>
            <Nav.Link href='/login'>Log in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* <nav className='navbar navbar-expand-lg navbar-dark bg-dark mt-3'>
        <div className='d-flex flex-grow-1'>
          <span className='w-100 d-lg-none d-block'></span>
          <a className='navbar-brand d-none d-lg-inline-block' href='/'>
            <h1>PostApp</h1>
          </a>
          <div className='w-100 text-right'>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#myNavbar'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
          </div>
        </div>
        <div
          className='collapse navbar-collapse flex-grow-1 text-right'
          id='myNavbar'
        >
          <ul className='navbar-nav ms-auto flex-nowrap'>
            <li className='nav-item'>
              <a href='/login' className='nav-link m-2 menu-item nav-active'>
                Log in
              </a>
            </li>
          </ul>
        </div>
      </nav> */}
    </div>
  );
};
