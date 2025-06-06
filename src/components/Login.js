
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth'
import "../App.css";
import { useState, useEffect } from "react";

export const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");

  const [getToken, setGetToken] = useState("");
  const [user, setUser] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  // const redirectPath = location.state?.path || '/'

  // const handleLogin = () => {
  //   auth.login(email)
  //   navigate(redirectPath, { replace: true })
  // }


  let handleSubmit = async (e) => {
           
    
    // navigate(redirectPath, { replace: true })
    // auth.Login(user)
    e.preventDefault();
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
   
      urlencoded.append("email", email);
      urlencoded.append("password", password);
      // for (var pair of urlencoded.entries())
      // {
      //  console.log(
      //   // pair[0]+ ', '+
      //    pair[1]
      //   ); 
      // }

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
//ye ap ny sai wala dala tha ab dono condition check kro
      fetch("https://ecomerce-shop-nodejs.vercel.app/auth", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const data =JSON.parse(result)
          const {token,email} = data || {};
          if(token){
            if(email === "buttehtesham86@gmail.com"){
              navigate("/admin")
             auth.login(email)
            }
            else if(token){
              navigate("/proceed")
            }
            localStorage.setItem("token",token)
          }
         else{
            alert("Invalid! Please try again")
          }
        })
        .catch((error) => console.log("error", error));
    } catch (err) {
      console.log(err);
    }
  };




  return (<>
    {/* <div>
      <label>
        Username: <input type='text' onChange={e => setUser(e.target.value)} />
      </label>{' '}
      <button onClick={handleLogin}>Login</button>
    </div> */}
    
    
    
    
    <div className="text-center position-absolute top-50 start-50 translate-middle signup-form body1">
    <form onSubmit={handleSubmit} className="row g-3 form-group">
      <div className="col-12  form-group">
    
    
        <input   className="form-control  "
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setemail(e.target.value)}
        /></div><div className="col-md-12 form-group">
        <input   className="form-control "
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
        /></div>
        <button className=" btn  btn-primary" type="submit">Login</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
      <div className="hint-text ">
          Don't have an account?Click here{" "}
          <a href="/register">
            <span className="text-dark">Create an Account</span>
          </a> <br/><span className="psw">Forgot password? <a href="/forgottenpassword">Reset here</a></span>
        </div>
    </div>
    
    
    
    </>
  )
}
