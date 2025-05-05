import React, { useState, useEffect } from "react";
import MultiImages from "../MultiImages/MultiImages";

const UpdateServiceDat = (props) => {
  const { productData } = props;

  const [name, setName] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setDiscountPercent(productData.discountPercent || "");
      setPrice(productData.price || "");
      setCountInStock(productData.countInStock || "");
      setDescription(productData.description || "");
      setType(productData.type || "");
    }
  }, [productData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      if (file) formdata.append("photo", file);
      formdata.append("name", name);
      formdata.append("discountPercent", discountPercent);
      formdata.append("price", price);
      formdata.append("countInStock", countInStock);
      formdata.append("description", description);
      formdata.append("type", type);

      const url = `https://ecomerce-shop-nodejs.vercel.app/service/${productData._id}`;
      const requestOptions = {
        method: "PUT",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);
      const result = await response.text();
      console.log("Updated:", result);
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const url = `https://ecomerce-shop-nodejs.vercel.app/service/${productData._id}`;
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };
      const response = await fetch(url, requestOptions);
      const result = await response.text();
      console.log("Deleted:", result);
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <>
      <h2 className="text-center">Update Service Form</h2>

      <div className="container">
        <form onSubmit={handleUpdate} className="needs-validation" noValidate>
          {/* Name */}
          <div className="row">
            <div className="col-25">
              <label htmlFor="name">Name</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                name="name"
                placeholder="Product name.."
              />
            </div>
          </div>

          {/* Count in Stock */}
          <div className="row">
            <div className="col-25">
              <label htmlFor="countInStock">CountInStock</label>
            </div>
            <div className="col-75">
              <input
                type="number"
                id="countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
                placeholder="Count in stock.."
              />
            </div>
          </div>

          {/* Price */}
          <div className="row">
            <div className="col-25">
              <label htmlFor="price">Price</label>
            </div>
            <div className="col-75">
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Price.."
              />
            </div>
          </div>

          {/* Discount Percent */}
          <div className="row">
            <div className="col-25">
              <label htmlFor="discountPercent">Discount Percent</label>
            </div>
            <div className="col-75">
              <input
                type="number"
                id="discountPercent"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                required
                placeholder="Discount percent.."
              />
            </div>
          </div>

          {/* Type */}
          <div className="row">
            <div className="col-25">
              <label htmlFor="type">Type</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Type of product"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="row">
            <div className="col-25">
              <label htmlFor="file">Image</label>
            </div>
            <div className="col-75">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
          </div>

          {/* Description */}
          <div className="row">
            <div className="col-25">
              <label htmlFor="description">Description</label>
            </div>
            <div className="col-75">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Write something..."
                style={{ height: "200px" }}
              ></textarea>
            </div>
          </div>

          <br />
          <div className="row d-flex justify-content-between gap-2">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-save"></i> Update
            </button>
            {productData && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                <i className="fas fa-trash-alt"></i> Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateServiceDat;
