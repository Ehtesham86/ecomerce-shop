import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { addToCart,Removecart } from "./../../Redux/Action/actions";
import axios from "axios";
import instance from '../../instance'
// import "../App.css";
import { useParams } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";

export const Productupdate = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const dispatch = useDispatch();

  const { id } = useParams();
  const [loadData, setLoadData] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
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
    instance.get('product')
            .then(res => {
              setProduct(res.data)
              console.log("product",res)
            })
            .catch(err => {
                if (err.response.data.error) {
                    console.log(err.response.data.error)
                }
            })
  }, [])
  return (
    <>
     <div
  className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 mt-5 ml-5 mr-5
              row-cols-xl-3 justify-content-start"
>
  {product &&
    product.productData.map((Data, i) => {
      return (
        <div key={i} className="col mb-5">
          <div className="card margin-bit product-card">
            <Link to={`/product/${Data._id}`}>
              <img
                className="card-img-top"
                src={Data.imageUrl}
                width="100%"
                height="200"
                alt="..."
              />
            </Link>
            <div className="card-body p-4 pb-0">
              <div className="text-left h-all">
                <h5 className="title">
                  <span className="subtitle namet">{Data.name}</span>
                  <span className="d-flex justify-content-end">
                    Rs. <span className="currency text-danger">{Data.price}</span>
                  </span>
                </h5>
                <p className="truncate-text">
                  <span
                    className="d-inline-block text-truncate"
                    style={{ maxWidth: '150px' }}
                  >
                    {Data.description}
                  </span>
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="card-footer margin-b p-1 pt-0 border-top-0 bg-transparent">
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={() => editService(Data)} // replace with your actual edit function
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
        <UpdateProduct productData={selectedService} />
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
                  onClick={() => dispatch(addToCart(Data))}
                >
                  Add To Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      );
    })}
</div>

      <Outlet />
    </>
  );
};
