import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const NavItem = (props) => {
  return (
    <NavLink to={`${props.link}`} className="fs-5 m-1 text-center link-underline link-underline-opacity-0 fw-bold bg-info bg-opacity-75 rounded-5">{props.title}{props.children}</NavLink>
  )
}

export default NavItem