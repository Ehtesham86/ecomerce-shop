import React, { useState, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";

import MultiImages from "../MultiImages/MultiImages";
import AddProduct from "./AddProduct";
import AddService from "./AddService";
import AdminBar from "./AdminBar";
// import Orders from './Orders'
import axios from "axios";
import { CartDetails } from "../CartDetails";
import { Productupdate } from "./Productupdate";
import { UpdateService } from "./UpdateService";
const Admin = () => {
  const [checkout, setcheckout] = useState([]);
  const modalRef = useRef(null);

  const [data, setdata] = useState("");
  const [filterDatasFormState, setFilterDatasFromState] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("Product");

  const editServiceModal = (service) => {
    setShowEditModal(true);
  };

  const handleClose = () => setShowEditModal(false);
  
  useEffect(() => {
    if (showEditModal && modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();

      // Optional: Reset state when modal is closed
      modalRef.current.addEventListener("hidden.bs.modal", () => {
        setShowEditModal(false);
        setSelectedService(null);
      });
    }
  }, [showEditModal]);
  useEffect(() => {
    axios
      .get("https://ecomerce-shop-nodejs.vercel.app/checkout/")
      .then((res) => {
        setcheckout(res.data); // show me the map thing you were talk
        console.log("checkoutData>", res.data);

        let cartData = [];
        cartData.push(res.data.checkoutData);
        console.log("cartData", cartData);
        let obj = cartData[0].find((o) => o._id === "63413b365f939d78a26cfafc");
        console.log("objobjobjobj", obj.firstName);
        console.log(checkout, "cart items");
        let filterDatas = [];
        for (let i = 0; i < cartData[0].length; i++) {
          let data = cartData[0][i];
          let items = [];
          // setfilterDatas(filterDatas)
          for (let j = 0; j < cartData[0][i].cartItems.length; j++) {
            axios
              .get(
                `https://ecomerce-shop-nodejs.vercel.app/product/${cartData[0][i].cartItems[j]}`
              )
              .then((response) => {
                // console.log(response, 'Product responseresponse')
                let productData = response.data.product.name;
                // console.log(productData)
                items.push({
                  _id: cartData[0][i].cartItems[j],
                  name: productData,
                });
              });

            filterDatas.push(items);
            setFilterDatasFromState(filterDatas);
          }
        }
        console.log(filterDatas);
      })
      .catch((err) => console.log(err));
  }, []);
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
  
async function deleteById(_id){
axios.delete(`https://ecomerce-shop-nodejs.vercel.app/checkout/${_id}`)
.then(result=>console.log("rresult>>",result)

)
// const del = checkout.filter(checkout => _id!== checkout._id)
// setcheckout(del)

// result=await result.json()
// console.log(result)
}
  return (
    <>  <AddProduct/><AddService/>

<div className="container-fluid min-vh-100 bg-light py-4 px-3">
      {/* Tabs */}
      <div className="row text-center">
        {['Product', 'Service', 'Client Details'].map((tab) => (
          <div className="col-4" key={tab}>
            <button
              className={`btn w-100 py-2 fw-semibold ${
                activeTab === tab
                  ? 'btn-primary'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 mt-4 shadow-sm rounded">
        {activeTab === 'Product' && (
          <div className="h5 fw-medium"><Productupdate/></div>
        )}
        {activeTab === 'Service' && (
          <div className="h5 fw-medium"><UpdateService/></div>
        )}
        {activeTab === 'Client Details' && (
          <div className="h5 fw-medium"> <div
          style={{ width: "100%" }}
          className="row gx-4 gx-lg-5 row-cols-2  row-cols-md-1 mt-5 
                  row-cols-xl-1 justify-content-start "
        >
                  {checkout?.checkoutData?.map((service,i) => ( // add this "products &&" before products.map
                    <div key={i}>
                    <div className="card mb-3 ml-5 mr-5 container" style={{ maxWidth: "100%" }}>
                      <div className="row g-0">
                        <div className="col-md-4">
                        <div className="card text-white bg-primary mb-3 " style={{maxWwidth: '18rem'}}>
        <div className="card-header">Client Details</div>
        <div className="card-body">
          <h5 className="card-title">{service.email}</h5>
          <p className="card-text">Phone 
          <span className="mr-4"> {service.Phone}</span><span className="mx-4">{service._id}</span>
      
      </p>
        </div>
      </div>
                    
                          {" "}
                        </div>
                        <div className="col-md-8 ">
                          <div className="card-body">
                            {" "}
                            <div className="card-body p-4 pb-0">
                              <div className="text-left">
                                <h5 className="title" >
                               <span className="text-warning">Client's name:</span> {service.firstName} {service.lastName}<span className="text-warning"> from</span>   {service.address}  <span className="subtitle"></span>
                                  <span className="prc d-flex  justify-content-end ">
                                    {" "}
                                    Rs {service.total} <span className="currency">  
                                    </span>{" "}
                                  </span>
                                </h5>
                                <p><span className="text-warning mr-4">Products: </span> {service?.cartItems?.map((items,j) => (
                                  <span>{items.name} ({items.type} ) - </span>
                                 ))}
                                </p>
                                 <p><span className="text-warning mr-4">Status:</span> <span> {service?.status} </span>
                                
                                </p>
                                <div className="d-flex justify-content-between">
                               
                                </div>
                              </div>
      
                            </div>
                           
                            <div className="card-footer d-flex justify-content-center gap-3 p-2 border-top-0 bg-transparent">
        <button
          className="btn btn-outline-danger d-flex align-items-center gap-2"
          onClick={() => deleteById(service._id)}
        >
          <i className="fas fa-trash-alt"></i>
          Delete
        </button>
        {/* <button
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          onClick={() => editService(service)} // replace with your actual edit function
        >
          <i className="fas fa-edit"></i>
          Edit
        </button> */}
      
      
      
        <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Service
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <AddService selectedService={selectedService}/>      </div>
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
      
      
      
      
      
      
      
      
      
      
      
      </div>
      
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                      
                  ))}
              </div></div>
        )}
      </div>
    </div>
   
  
    </>
  )
};

export default Admin;
