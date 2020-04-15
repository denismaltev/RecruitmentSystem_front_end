import React from 'react'
import { Label } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'

export default class LogIn extends React.Component {
    
    render(){
      return(
        <div>
            <h1> Signin </h1>
            <br/>
            <Label htmlFor='email'> Email : 
            <input
              id='email'
              type='email'
              placeholder='Enter Your email'
            />
            </Label>
            <br />
            <Label htmlFor='password'> Password : 
              <input
                id='password'
                type='password'
                placeholder='Enter Your password'
              />
            </Label>
            <br/>
            <Label>
              <button> Signin </button>
            </Label>
            <br />
          <Link to='/'>Problems logging in?</Link>
        </div>
      )
    }
}