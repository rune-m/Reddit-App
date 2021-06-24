import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useUser } from "../state/UserContext";

export const NavbarTop = () => {
  const { user, logout } = useUser();

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
            {!user ? (
              <>
                <Nav.Link href='/login'>Log in</Nav.Link>
                <Nav.Link href='/register'>Register</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/account'>My Account</Nav.Link>
                <Nav.Link href='/login' onClick={logout}>
                  Log out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
