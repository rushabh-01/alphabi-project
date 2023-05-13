"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { user, login } = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    
    try {
      setLoading(true)
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      console.log(err)
      if (err.code === "auth/wrong-password") {
        setPasswordError("Incorrect password");
      }else if (err.code === "auth/user-not-found") {
        setEmailError("User not found");
      }
    } finally{
      setLoading(false)
    }

    console.log(user)
    setFormSubmitted(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // reset the email error message
  }
  const handlePasswordChange = (e) => {
    setPass(e.target.value);
    setPasswordError(""); // reset the email error message
  }

  return (
    <div className="auth-form-container">
      {loading ? (
        <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      ) :
      <>
      <h2 style={{ marginBottom: 20 }}>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={handleEmailChange}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        {formSubmitted && email === "" && <p className="pwd-msg">please enter email</p>}
        {emailError && <p className="pwd-msg">{emailError}</p>}
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        {formSubmitted && password.length < 6 && password !== "" && <p className="pwd-msg">password should be more than 6 characters</p>}
        {formSubmitted && password === "" && <p className="pwd-msg">please enter password</p>}
        {passwordError && <p className="pwd-msg">{passwordError}</p>}

        
        <button type="submit" style={{marginTop:30}}>Login</button>

      </form>
      <Link href="/signup" className="link-btn">
          Don&apos;t have an account? Register here.
      </Link>
      </>
}
    </div>
  );
}
