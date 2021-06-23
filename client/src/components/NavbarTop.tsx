import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";

export const NavbarTop = () => {
  return (
    <div>
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
            {/* Add component for handling logged in/logged out */}
            <Nav.Link href='/login'>Log in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
