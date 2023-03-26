import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { login, clearAuthMsg } from "../../redux/actions/authActions";
import Loading from "../../components/Loading";
import { connect } from "react-redux";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { createClient } from "@supabase/supabase-js";
import { Facebook, Google } from "@mui/icons-material";
import styles from "./socialLinks.module.css";
import { toast } from "react-toastify";
import { gapi } from "gapi-script";

// const supabase = createClient(
//   "https://dmmjiwtnypxeuxqjgtrk.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbWppd3RueXB4ZXV4cWpndHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU0NTcyNDYsImV4cCI6MTk5MTAzMzI0Nn0.ro-zLw-vI5u_Yp7uqwxAJ0pR7mLiaZCldBXvc-Z0TNE"
// );

function Login(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [logging, setLogging] = useState(false);

  const [error, setError] = useState(false);
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      handleClientLoad();
    } else if (props.auth.msg === "Login Successfully") {
      toast.success("Logged in successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      props.close();
      setLoading(false);

      // props.history.push("/");
    } else if (props.auth.msg === "Login Fails") {
      setLoading(false);
      setLogging(false);
    }
  }, [props.auth.msg]);

  const handleClientLoad = async () => {
    await gapi.load("client:auth2", initClient);
  };

  const CLIENT_ID =
    "411418972730-p6ltamif38oak6mleqfg81s7uat4dfbk.apps.googleusercontent.com";
  const API_KEY = "AIzaSyAB6v5n89DqLHboSyDLgwT1nm9nwhBCF1A";

  const initClient = () => {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: "profile email",
      })
      .then(
        () => {
          console.log("Client loadded");
          // Listen for sign-in state changes
          // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // // Handle the initial sign-in state
          // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        (error) => {
          alert(
            "Sorry google API is not initialized. Kindly check your internet connection and try again!"
          );
        }
      );
  };

  const updateSigninStatus = async () => {
    let isSignedIn = await gapi.auth2.getAuthInstance().isSignedIn.get();
    if (isSignedIn) {
      // Request access to user's email and Google Calendar
      const token = await gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse().access_token;

      // await gapi.auth.setToken({ access_token: token });
      // Send access token to server for verification and session management
      // ...
      if (token) {
        await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        }).then(async (response) => {
          const user = await response.json();
          console.log("USER", user);
          await props.login({
            full_name: user.name,
            email: user.email,
            picture: user.picture,
          });
        });
      }
    }
  };

  const handleSignInClick = async () => {
    setLoading(true);
    await gapi.auth2.getAuthInstance().signIn();
    updateSigninStatus();
  };
  // const loginWithGoogle = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //   });
  // };
  // const loginWithPassword = () => {
  //   setLogging(true);
  //   supabase.auth
  //     .signInWithPassword({
  //       email,
  //       password,
  //     })
  //     .then((res) => {
  //       if (res.error?.status === 400) {
  //         setError("Invalid login credentials");
  //       }
  //       if (res.data?.user) {
  //         setLoading(true);
  //         props.login({
  //           emailId: res.data.user.email,
  //           userId: res.data.user.id,
  //           email_verified: true,
  //         });
  //       }
  //       setLogging(false);
  //     });
  // };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        backgroundImage: "url(/loginBackgroundImage.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          background: "white",
          borderRadius: 8,
          padding: "1px 40px",
          display: "flex",
          alignItems: "center",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => handleSignInClick()}
      >
        <img src="/googleIcon.png" width={20} height={20} alt="google" />
        <p style={{ color: "black", fontWeight: 600, marginLeft: 20 }}>
          Signup With Google
        </p>
      </button>
    </div>
    // <div style={{ background: "black" }}>
    //   <div style={{ maxWidth: 300, margin: "auto" }}>
    //     <div style={{ margin: "15px 0" }}>
    //       <label style={{ color: "white" }}>Email Address</label>

    //       <input
    //         value={email}
    //         type="email"
    //         placeholder="Your Email Address"
    //         onChange={(e) => {
    //           if (error) {
    //             setError(false);
    //           }
    //           setEmail(e.target.value);
    //         }}
    //         style={{
    //           width: "100%",
    //           padding: "18px 10px",
    //           border: "black 1px solid",
    //           borderRadius: 10,
    //           color: "black",
    //           margin: "10px 0",
    //         }}
    //         onBlur={() => {
    //           if (!email.includes("@")) {
    //             setError("Invalid Email Id");
    //           }
    //         }}
    //       />
    //     </div>
    //     <div style={{ margin: "15px 0" }}>
    //       <label style={{ color: "white" }}>Password</label>

    //       <input
    //         value={password}
    //         type="password"
    //         placeholder="Your Password"
    //         onChange={(e) => {
    //           if (error) {
    //             setError(false);
    //           }
    //           setPassword(e.target.value);
    //         }}
    //         style={{
    //           width: "100%",
    //           margin: "10px 0",
    //           padding: "18px 10px",
    //           border: "black 1px solid",
    //           borderRadius: 10,
    //           color: "black",
    //         }}
    //         onBlur={() => {
    //           if (password.length < 8) {
    //             setError("Password should've at least 8 characters");
    //           }
    //         }}
    //       />
    //     </div>
    //     {error && (
    //       <div>
    //         <p
    //           style={{
    //             width: "100%",
    //             background: "#f2dddd",
    //             borderRadius: 15,
    //             padding: 10,
    //             textAlign: "center",
    //             display: "flex",
    //             justifyContent: "center",
    //             color: "black",
    //             marginBottom: 15,
    //             alignItems: "center",
    //             fontSize: 13,
    //           }}
    //         >
    //           <ErrorOutlineIcon style={{ marginRight: 10 }} />
    //           {error}
    //         </p>
    //       </div>
    //     )}
    //     <button
    //       style={{
    //         background:
    //           password.length < 8 || !email.includes("@")
    //             ? "gray"
    //             : "linear-gradient(66deg, rgba(255,213,0,1) 0%, rgba(140,253,45,1) 100%)",
    //         width: "100%",
    //         color:
    //           password.length < 8 || !email.includes("@") ? "white" : "black",
    //         padding: 15,
    //         boxShadow: "0 10px 18px 0 rgb(0 0 0 / 34%",
    //         borderWidth: 0,
    //         borderRadius: 20,
    //         cursor:
    //           logging || password.length < 8 || !email.includes("@")
    //             ? ""
    //             : "pointer",
    //       }}
    //       onClick={() => {
    //         if (error) {
    //           setError(false);
    //         }
    //         loginWithPassword();
    //       }}
    //       disabled={logging || password.length < 8 || !email.includes("@")}
    //     >
    //       {logging ? "Working..." : "Log in"}
    //     </button>

    //     <div
    //       style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
    //     >
    //       <button
    //         // href="/authentication/signup"
    //         onClick={() => props.setFor("signup")}
    //         style={{
    //           fontWeight: 500,
    //           fontSize: 16,
    //           color: "rgb(230 221 221)",
    //           background: "none",
    //           border: "none",
    //           cursor: "pointer",
    //         }}
    //       >
    //         Not signed up yet?{" "}
    //         <span
    //           style={{
    //             background:
    //               "linear-gradient(66deg, rgba(255,213,0,1) 0%, rgba(140,253,45,1) 100%)",
    //             WebkitBackgroundClip: "text",
    //             WebkitTextFillColor: "transparent",
    //           }}
    //         >
    //           <b>Create Account</b>
    //         </span>
    //       </button>
    //     </div>
    //   </div>
    //   <hr className={styles.hrText} />
    //   <div style={{ display: "flex", justifyContent: "space-around" }}>
    //     <button
    //       className={styles.socialMediaButton}
    //       onClick={loginWithGoogle}
    //       style={{ display: "flex", alignItems: "center" }}
    //     >
    //       <Google style={{ color: "white", fontSize: 28, marginRight: 15 }} />
    //       <p style={{ color: "white" }}>Login With Google</p>
    //     </button>
    //   </div>
    // </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error.error,
});

export default connect(mapStateToProps, { login, clearAuthMsg })(Login);
