import React, { useEffect, useState } from "react";
 
const UpdateProduct = (props) => {
  console.log(props.productData, "productData_____");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const productId = props.productData?._id;

  useEffect(() => {
    if (props.productData) {
      const product = props.productData;
      setName(product.name || "");
      setPrice(product.price || "");
      setCountInStock(product.countInStock || "");
      setDescription(product.description || "");
      setType(product.type || "");
      setImage(product.imageUrl || "");
    }
  }, [props.productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("photo", file);
      formdata.append("name", name);
      formdata.append("price", price);
      formdata.append("countInStock", countInStock);
      formdata.append("description", description);
      formdata.append("type", type);

      const requestOptions = {
        method: "PUT",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(`https://ecomerce-shop-nodejs.vercel.app/product/${productId}`, requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      const response = await fetch(`https://ecomerce-shop-nodejs.vercel.app/product/${productId}`, requestOptions);
      const result = await response.json();
      console.log(result.message);
      alert("Product deleted successfully!");
      // You can add logic here to redirect the user or update the UI
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the product.");
    }
  };

  return (
    <>
      <h2 className="text-center">Update Product Form</h2>

      <div className="container">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row">
            <div className="col-25">
              <label htmlFor="fname">Name</label>
            </div>
            <div className="col-75">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Product name..." />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="countInStock">Count In Stock</label>
            </div>
            <div className="col-75">
              <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required placeholder="Count in stock..." />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="price">Price</label>
            </div>
            <div className="col-75">
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="Price..." />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="type">Type</label>
            </div>
            <div className="col-75">
              <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Product type..." />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="image">Image</label>
            </div>
            <div className="col-75">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              {image && <img src={image} alt="current" style={{ width: 100, height: 100, marginTop: 10 }} />}
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="description">Description</label>
            </div>
            <div className="col-75">
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Write something..." style={{ height: "200px" }}></textarea>
            </div>
          </div>

          <br />
          <div className="row">
            <input type="submit" value="Update Product" />
          </div>
        </form>

        {/* Delete Button Section */}
        <div className="row mt-3">
          <button
            onClick={handleDelete}
            className="btn btn-danger d-flex align-items-center justify-content-center"
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            <i class="fa fa-trash" style={{ marginRight: "10px" }}  aria-hidden="true"></i>

             Delete Product
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
