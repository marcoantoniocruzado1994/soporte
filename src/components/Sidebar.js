import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export const Sidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/users"
          >
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
