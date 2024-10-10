import React, { useContext } from 'react'
import UserLayout from '../layout/UserLayout'
import { GlobalContext } from '../../context/context'


function Profile() {
  let {state ,dispatch}= useContext(GlobalContext)
  return <UserLayout>

<div className="row justify-content-around mt-5 user-info">
      <div className="col-12 col-md-3">
        <figure className="avatar avatar-profile">
          <img
            className="rounded-circle img-fluid"
            src={state?.user?.avatar ? state.user?.avatar?.url : "/images/default_avatar.jpg" }
            alt=""
          />
        </figure>
      </div>

      <div className="col-12 col-md-5">
        <h4>Full Name</h4>
        <p>{state.user?.name}</p>

        <h4>Email Address</h4>
        <p>{state.user?.email}</p>

        <h4>Joined On</h4>
        <p>2023-09-19</p>
      </div>
    </div>

  </UserLayout>

}

export default Profile
