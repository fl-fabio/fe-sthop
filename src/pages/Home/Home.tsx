import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import UsersList from '../../components/UserList/UserList'

const Home = () => {
  return (
    <div>
         
      <UsersList />

    </div>
  )
}

export default Home
