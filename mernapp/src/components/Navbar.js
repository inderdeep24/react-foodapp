import React, { useState } from 'react';

import { Link ,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer';


export default function Navbar() {
    const [Cartview, setCartview] = useState(false)
    let data = useCart()
    const navigate = useNavigate()
    const handlelogout = ()=>{
        localStorage.removeItem("authtoken")
        navigate("/login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Go Food</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                           <li className="nav-item">
                                <Link className="nav-link active fs-5 mt-3" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authtoken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5 mt-3" aria-current="page" to="/myorder">My Orders</Link>
                                </li>
                                : ""}

                        </ul>
                        {(!localStorage.getItem("authtoken")) ?
                            <div className='d-flex'>

                                <Link className="btn bg-white text-dark mx-1" aria-current="page" to="/login">Login</Link>


                                <Link className="btn bg-white text-dark mx-1 " aria-current="page" to="/signup">Signup</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-dark mx-2' onClick={()=>{setCartview(true)}}>
                                    My Cart {"  "}
                                    <Badge pill bg='danger'>{(data.length === 0 ? "" : data.length)}</Badge>

                                </div>
                                {Cartview? <Modal onClose={()=>setCartview(false)}><Cart/></Modal>:null}
{/*                                 
                                {Cartview ? <Modal onClose={() => setCartview(false)}><Cart data={data} /></Modal> : null} */}


                                <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>
                                    Logout
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}
