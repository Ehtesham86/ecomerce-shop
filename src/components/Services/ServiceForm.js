import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
const ServiceForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [type, setSerivce] = useState("");
  const { cartItems } = useSelector((reducers) => reducers.cartReducer);

  const item = cartItems;

  const total = item
    .map((item) => Number(item.price))
    .reduce((prev, curr) => prev + curr, 0);



    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
      
        var formdata = new FormData();
        formdata.append("firstName", firstName);
        formdata.append("lastName", lastName);
        formdata.append("Phone", Phone);
        formdata.append("email", email);
        formdata.append("address", address);
        formdata.append("time", time);
        formdata.append("city", city);
        formdata.append("country", country);
        formdata.append("cartItems", cartItems);
        formdata.append("type", type);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("https://ecomerce-shop-nodejs.vercel.app/serviceForm", requestOptions)
          .then(response => response.text())
          .then(result => console.log('errors',result))
          .catch(error => console.log('error', error));
        
      } catch (err) {
        console.log(err);
      }
    };


    
  return (
    <>
      <div className="container">
        <main>
          <div className="py-5 text-center">
            <img
              className="d-block mx-auto mb-4"
              src="https://cdn.pixabay.com/photo/2014/04/03/10/00/shopping-cart-309592__480.png"
              alt=""
              width="72"
              height="57"
            />
            <h2>Checkout form</h2>
            <p className="lead">
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p>
          </div>

          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">
                  {cartItems.length}
                </span>
              </h4>

              {cartItems.map((item) => {
                return (
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-muted">{item.description}</small>
                      </div>
                      <span className="text-muted">Rs {item.price}</span>
                    </li>
                  </ul>
                );
              })}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (Rs)</span>
                <strong>${total}</strong>
              </li>

            
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form onSubmit={handleSubmit} className="needs-validation" novalidate>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label for="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label for="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label for="Phone" className="form-label">
                      Phone
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text"></span>
                      <input
                        type="number"
                        className="form-control"
                        id="Phone"
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                      <div className="invalid-feedback">
                        Your Phone is required.
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label for="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label for="address" className="form-label">
                    Adress
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="1234 Main St"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                <div className="col-12">
                    <label for="address2" className="form-label">
                    Booking (date and time): <span className="text-muted"></span>
                    </label>
  <input type="datetime-local" id="time" name="time"value={time}
                      onChange={(e) => setTime(e.target.value)}/>
                   
                  </div> 

                  <div className="col-md-5">
                    <label for="country" className="form-label">
                      Country
                    </label>
                    <select className="form-select" id="country"value={country}
                      onChange={(e) => setCountry(e.target.value)} required>
                      <option value="">Choose...</option>
                      <option>United Kingdom</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>



                  <div className="col-md-5">
                    <label for="country" className="form-label">
                      Country
                    </label>
                    <select className="form-select" id="type"  value={type}
                      onChange={(e) => setSerivce(e.target.value)}
                     required>
                      <option value="">Choose...</option>
                      <option>serivce</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select the type
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                  
                  
                  </div> */}


                  <div className="col-md-4">
                    <label for="state" className="form-label">
                    City
                    </label>
                    <select className="form-select" id="city" value={city}
                      onChange={(e) => setCity(e.target.value)} required>
                      <option value="">Choose...</option>
                      <option>London</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label for="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder=""
                      required
                    />
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                </div>

                <hr className="my-4" />

               

             

                <button className="w-100 btn btn-primary btn-lg" type="submit">
                  Continue to checkout
                </button> 
              </form>
            </div>
          </div>
        </main>

        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">&copy; 2017–2021 Company Name</p>
          <ul className="list-inline">
           
          </ul>
        </footer>
      </div>
    </>
  );
};

export default ServiceForm;
