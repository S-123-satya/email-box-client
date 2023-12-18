import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = (props) => {
  return (
    <NavLink to={`${props.link}`} className="fs-5 m-1 ps-1 link-underline link-underline-opacity-0 fw-bold bg-info bg-opacity-75 rounded-end-5">{props.title}</NavLink>
  )
}

export default NavItem