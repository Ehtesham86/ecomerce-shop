import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { addToCart } from "./../../Redux/Action/actions";
import "../../App.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdateServiceDat from './UpdateServiceDat';
export const UpdateService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const auth = useAuth()
  const handleLogout = () => {
    auth.logout()
   localStorage.removeItem("token");
   localStorage.removeItem("user");
    navigate("/login");
  }


  const { _id } = useParams();
  const [loadData, setLoadData] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  const [service, setService] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
     const modalRef = useRef(null);
    
    // Show Bootstrap modal programmatically
    useEffect(() => {
      if (selectedService && modalRef.current) {
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
      }
    }, [selectedService]);
    
    const [product, setProduct] = useState("");
    const editServiceModal = (service) => {
      setShowEditModal(true);
    };
  const editService = (service) => {
    // You can access the ID like service._id
    console.log("Editing service with ID:", service._id);
    console.log("Editing service with ID:service", service);

    setSelectedService(service);
    setShowEditModal(true);
    // Example: navigate to another route or open a modal
    // navigate(`/edit-service/${service._id}`); // if using React Router
    // or set selectedService in state and show a modal
  };
  useEffect(() => {
   
         axios.get('https://ecomerce-shop-nodejs.vercel.app/service').then((res) => setService(res.data))
         .catch((err) => console.log(err));
        
   
  }, []);
 
  
  return (<>
    {/* <div> Welcome {auth.user}.<button className="btn btn-primary btn-lg mx-auto" onClick={handleLogout}>Logout</button>
    </div> */}
    

    <div
        style={{ width: "100%" }}
        className="row gx-4 gx-lg-5 row-cols-2  row-cols-md-1 mt-5 ml-3 mr-3
                row-cols-xl-1 justify-content-start "
      >
                {service && service.serviceData.map((service,i) => ( // add this "products &&" before products.map
                  <div key={i}>
                  <div className="card mb-3 ml-5 mr-5" style={{ maxWidth: "100%" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        {/* <Link to={{pathname:`/service/${service._id}`, obj:{service}}}> */}
                          {console.log("I am Console", _id)}
                          <Link to={`/service/${service._id}`}>         <img
                            className="card-img-top"
                            src={service.imageUrl}
                            width="100%"
                            height="200"
                            alt="..."
                          /></Link>
                        {/* </Link> */}
                        {" "}
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          {" "}
                          <div className="card-body p-4 pb-0">
                            <div className="text-left ">
                              <h5 className="title sname">
                                <span className="subtitle d-flex">{service.name} </span>
                                <span className="prc d-flex justify-content-end ">
                                  {" "}
                                   Rs.<span className="currency">
                                   {service.price}
                                  </span>{" "}
                                </span>
                              </h5>
                              <p className='para1 d-flex'>{service.description}</p>
                              <div className="d-flex justify-content-between">
                                {/* <p>
                                  Quantity <span> Unit</span>
                                </p>
                                <p className="rounded-pill border px-2">category</p> */}
                              </div>
                            </div>
                          </div>
                   
                          <div className="card-footer margin-b p-1 pt-0 border-top-0 bg-transparent">
                    
                          {/* Footer Buttons */}
            <div className="card-footer margin-b p-1 pt-0 border-top-0 bg-transparent">
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={() => editService(service)} // replace with your actual edit function
                >
                  <i className="fas fa-edit"></i>
                  Edit
                </button>
                <div
  className="modal fade"
  tabIndex="-1"
  ref={modalRef}
  id="editModal"
  aria-labelledby="editModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="editModalLabel">Edit Service</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <UpdateServiceDat productData={selectedService} />
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>

                <button
                  className="btn btn-outline-dark custom-button-primary"
                  onClick={() => dispatch(addToCart(service))}
                >
                  Add To Cart
                </button>
              </div>
            </div>

                    </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                    
                ))}
            </div>

     
    </>
  )
}
