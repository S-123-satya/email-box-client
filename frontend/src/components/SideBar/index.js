import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import NavItem from '../UI/NavItem';
import { Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux';


function SideBar() {
  const emailState=useSelector(state=>state.email);
  return (
    <Nav defaultActiveKey="/" className="flex-column">
      <NavLink to="/compose" className="btn m-2 fs-4 rounded-4 bg-opacity-75 bg-success" >Compose</NavLink>
        <NavItem link="/inbox" title="Inbox"><Badge className='text-danger'>{emailState.unReadMessages}</Badge></NavItem>
        <NavItem link="/sent" title="Sent"/>
    </Nav>
  );
}

export default SideBar;