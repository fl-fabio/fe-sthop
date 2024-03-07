import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import UsersList from '../../components/UserList/UserList'
import SignUpForm from '../../components/SignupForm/SignupForm'

const Home = () => {
  return (
    <div>
      <br />
      <div className='d-flex justify-content-center'>
      <SignUpForm />
      </div>
      <br />
      <UsersList />

    </div>
  )
}

export default Home
