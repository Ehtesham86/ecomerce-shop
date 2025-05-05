import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Modal from "react-bootstrap/Modal";
import axios from 'axios';


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "balck",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}
const CheckoutForm = (props) => {
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const stripe = useStripe()
    const elements = useElements()
console.log(props,"tripData");
    // const stripePayment = async () => {
        
    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: "card",
    //         card: elements.getElement(CardElement)
    //     })
        


    //     if (!error) {
    //         try {
                
    //             const { id } = paymentMethod
    //             const values = {
    //                 amount: props.tripdata.fee,
    //                 clientId: role.id,
    //                 tripDetails: props.tripdata,
    //                 paymentId: id,
    //                 tripId: props.tripdata._id
    //             }
    //             await makePayment(values)
    //                 .then((res) => {

    //                     if (res.data.message === "Payment successful") {

    //                         Swal.fire({
    //                             position: "center",
    //                             icon: "success",
    //                             text: "Payment successful",
    //                             color: "black",
    //                             showConfirmButton: false,
    //                             timer: 2000,
    //                         });
    //                         window.location.reload();
    //                     }
    //                     else {
    //                         Swal.fire({
    //                             position: "center",
    //                             icon: "error",
    //                             text: "Try Again",
    //                             color: "black",
    //                             showConfirmButton: false,
    //                             timer: 2000,
    //                         });
                           

    //                     }
    //                 });

                 
                

    //         } catch (error) {
    //             console.log("Error", error)
    //         }
    //     } else {
    //         console.log(error.message)
    //     }
    // }
     const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let handleEasyPaisa = async (e) => {
    e.preventDefault();
    
    try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        


        if (!error) {
            try {
                
                const { id } = paymentMethod
                const values = {
                   value:props?.userData,
                   cartItems:props?.userData?.cartItems,
                   paymentId:id
                }
                axios.post("https://ecomerce-shop-nodejs.vercel.app/checkout/easyPaisa",values)
      .then(data=>{
        
if(data?.data?.message==="checkout saved"){
alert("Address submitted successfully Submitted")
}if(data?.data?.message==="time change"){
    handleClose()
  alert("please select another time")
}
      })
      .catch(error=>{
        console.log(error)
      })

                 
                

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
      

     


      
    }
    catch (ex){
      console.log(ex)
    }
  }

  return (
    <>
    <button className="w-100 btn btn-dark btn-lg mt-3" type="" onClick={handleShow}>
                 Pay with Card
                </button>
               
       <Modal show={show} onHide={handleClose}>
                    
                    <Modal.Body className="px-4">
                        <form >
          <fieldset className="FormGroup">
              <div className="FormRow">
                  <CardElement options={CARD_OPTIONS} />
              </div>
              <div className='text-center'>
              <button className="btn btn-outline-primary mt-4"  type="button" onClick={handleEasyPaisa}   >
                  Make Payment
              </button>
              </div>
          </fieldset>
         
      </form>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-between px-4">

                        <button
                            className="btn btn-danger"
                            variant="danger"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                        
                    </Modal.Footer>
                </Modal>
      </>
  )
}

export default CheckoutForm