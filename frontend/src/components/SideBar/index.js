import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import NavItem from '../UI/NavItem';

function SideBar() {
  return (
    <Nav defaultActiveKey="/" className="flex-column">
      <NavLink to="/compose" className="btn m-2 fs-4 rounded-4 bg-opacity-75 bg-success" >Compose</NavLink>
        <NavItem link="/inbox" title="Inbox"/>
        <NavItem link="/message" title="Sent"/>
    </Nav>
  );
}

export default SideBar;