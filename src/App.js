import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand, NavLink, NavItem, Nav } from 'reactstrap';
import Menu from './components/Menu';
function App() {
  return (
    <div>
    {/* //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a */}
    {/* //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a> */}
    {/* //   </header> */}
    <Navbar dark color="primary">
      <div className="container">
        <NavbarBrand href="/">Restorant  Con Fusion</NavbarBrand>
        <Nav className="mr-auto" navbar>
        <NavItem>
            <NavLink href="/">Home</NavLink>
        </NavItem>
        </Nav>
      </div>
    </Navbar>
    <Menu />
    </div>
  );
}

export default App;
