import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';


import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    try {
      // Retrieve the user email from localStorage
      const userEmail = localStorage.getItem("useremail");

      // Debugging log to check the value of userEmail
      console.log("Retrieved userEmail from localStorage:", userEmail);

      // Check if userEmail is missing or empty
      if (!userEmail) {
        console.error("Email is missing from localStorage.");
        // Provide feedback to the user or return early if userEmail is missing
        alert("Your session has expired. Please log in again.");
        return;
      }
      
     
      // Prepare the request body
      const requestBody = {
        order_data: data, // Ensure 'data' is defined and valid
        
        email: userEmail,
        order_date: new Date().toLocaleString()
      };

      // Debugging log to verify the request body
      console.log("Request Payload:", requestBody);

      // Make the POST request to the server
      const response = await fetch("http://localhost:3000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      // Check the response status and handle response
      console.log("Response Status:", response.status);

      if (response.status === 200) {
        // If the response is successful, dispatch the action
        dispatch({ type: "DROP" });
        console.log("Order placed successfully.");
      } else {
        // Handle non-200 status codes (e.g., 400 or 500)
        console.error("Failed to place order. Response status:", response.status);

        // Optionally parse the response JSON for more details
        // const errorData = await response.json();
        // console.error("Error data:", errorData);
        // alert("There was an error placing your order. Please try again later.");
      }
    } catch (error) {
      // Catch and log any exceptions during the function execution
      console.error("An error occurred during checkout:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };



  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
               

                <td ><button type="button" className="btn p-0">< DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>

      </div>



    </div>
  )
}

