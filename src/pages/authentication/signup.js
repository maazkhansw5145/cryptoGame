import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { NavLink } from "react-router-dom";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { toast } from "react-toastify";
import { Facebook, Google } from "@mui/icons-material";
import styles from "./socialLinks.module.css";

const supabase = createClient(
  "https://dmmjiwtnypxeuxqjgtrk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbWppd3RueXB4ZXV4cWpndHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU0NTcyNDYsImV4cCI6MTk5MTAzMzI0Nn0.ro-zLw-vI5u_Yp7uqwxAJ0pR7mLiaZCldBXvc-Z0TNE"
);

function Signup(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [logging, setLogging] = useState(false);

  const signup = () => {
    setLogging(true);
    supabase.auth
      .signUp({
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.error?.status === 422) {
          setError("Enter valid email id, please!");
        } else {
          setEmailSent(true);
          setLoading(false);
          toast.success("Verification Email Send", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        setLogging(false);
      })
      .catch(() => {
        toast.error("Ooops! Error: Failed to signup", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div>
      <div style={{ maxWidth: 300, margin: "auto" }}>
        {emailSent ? (
          <div
            style={{
              padding: "0px 30px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: 22,
                textAlign: "center",
                margin: "25px 0 60px 0",
              }}
            >
              Verification email has sent. Please! check your inbox and click on
              verify.
            </p>
            <p
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                margin: "15px 0 60px 0",
                fontStyle: "italic",
              }}
            >
              <span style={{ color: "#DB4437" }}>Note:</span> If there is no
              verification email in your inbox, then you have already signed up.
              You can also reset your password{" "}
              <div>
                <NavLink
                  to="/authentication/forgot"
                  style={{
                    color: "cornflowerblue",
                    textDecoration: "underline",
                  }}
                >
                  Reset Password
                </NavLink>
              </div>
            </p>
          </div>
        ) : (
          <>
            <div style={{ margin: "15px 0" }}>
              <label style={{ color: "white" }}>Email Address</label>
              <input
                type="email"
                placeholder="Your Email Address"
                onChange={(e) => {
                  if (error) {
                    setError(false);
                  }
                  setEmail(e.target.value);
                }}
                style={{
                  width: "100%",
                  padding: "18px 10px",
                  border: "black 1px solid",
                  borderRadius: 10,
                  color: "black",
                  margin: "10px 0",
                }}
                onBlur={() => {
                  if (!email.includes("@")) {
                    setError("Invalid Email Id");
                  }
                }}
              />
            </div>
            <div style={{ margin: "15px 0" }}>
              <label style={{ color: "white" }}>Your Password</label>
              <input
                type="password"
                placeholder="Your Password"
                onChange={(e) => {
                  if (error) {
                    setError(false);
                  }
                  setPassword(e.target.value);
                }}
                style={{
                  width: "100%",
                  padding: "18px 10px",
                  border: "black 1px solid",
                  borderRadius: 10,
                  color: "black",
                  margin: "10px 0",
                }}
                onBlur={() => {
                  if (password.length < 8) {
                    setError("Password should've at least 8 characters");
                  }
                }}
              />
            </div>
            {error && (
              <div>
                <p
                  style={{
                    width: "100%",
                    background: "#f2dddd",
                    borderRadius: 15,
                    padding: 10,
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    color: "black",
                    marginBottom: 15,
                    alignItems: "center",
                    fontSize: 13,
                  }}
                >
                  <ErrorOutlineIcon style={{ marginRight: 10 }} />
                  {error}
                </p>
              </div>
            )}
            <button
              style={{
                background:
                  password.length < 8 || !email.includes("@")
                    ? "gray"
                    : "linear-gradient(66deg, rgba(255,213,0,1) 0%, rgba(140,253,45,1) 100%)",
                width: "100%",
                color: "white",
                padding: 15,
                borderWidth: 0,
                boxShadow: "0 10px 18px 0 rgb(0 0 0 / 34%",
                borderRadius: 20,

                cursor:
                  logging || password.length < 8 || !email.includes("@")
                    ? ""
                    : "pointer",
              }}
              onClick={() => {
                if (error) {
                  setError(false);
                }
                signup();
              }}
              disabled={logging || password.length < 6 || email.length < 6}
            >
              {logging ? "Working..." : "Sign Up"}
            </button>

            <div
              style={{
                marginTop: 25,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                // href="/authentication/login"
                onClick={() => props.setFor("login")}
                style={{
                  fontSize: 16,
                  color: "rgb(230 221 221)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Already have an account?{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(66deg, rgba(255,213,0,1) 0%, rgba(140,253,45,1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <b>Login</b>
                </span>
              </button>
            </div>
          </>
        )}
      </div>
      <hr className={styles.hrText} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button
          className={styles.socialMediaButton}
          onClick={loginWithGoogle}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Google style={{ color: "white", fontSize: 28, marginRight: 15 }} />
          <p style={{ color: "white" }}>Login With Google</p>
        </button>
      </div>
    </div>
  );
}

export default Signup;
