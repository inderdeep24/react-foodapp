import { useState } from "react"
import React from 'react'
import { Link,useNavigate } from "react-router-dom"

export default function Login() {

  const [credentials, setcredentials] = useState({ email: "", password: "" })

  let navigate = useNavigate()  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials")
    }

    if (json.success) {  
      localStorage.setItem("useremail",credentials.email);
      localStorage.setItem("authtoken",json.authtoken);
      console.log(localStorage.getItem("authtoken"))
      console.log(localStorage.getItem("useremail")); 
      navigate('/')
    }    
  }  

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />

          </div>
          <div className="mb-3">
            <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          </div>


          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/signup" className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </div>
  )
}
