"use client";

import Link from "next/link"
import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const { user, signup } = useAuth()
  const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [name, setName] = useState('');
    const router = useRouter()

    useEffect(() => {
      if (formSubmitted && user && password.length > 5) {
        router.push("/success");
      }
    }, [user]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email);
        try {
          setLoading(true)
          await signup(email,password)
        } catch (err) {
          console.log(err)
        } finally {
          setLoading(false)
        }
    
        console.log(user)
        setFormSubmitted(true);
        
    }
    
  return (
    <div className="auth-form-container">
        <h2 style={{marginBottom:20}}>Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>

            {/* <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" /> */}
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />

            {formSubmitted && email === "" && <p className="pwd-msg">please enter email</p>}


            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />

            {formSubmitted && password.length < 6 && password !== '' && <p className="pwd-msg">password should be more than 6 characters</p>}
        {formSubmitted && password === "" && <p className="pwd-msg">please enter password</p>}


        {loading ? (
        <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      ) :
            <button type="submit" style={{marginTop:30}}>Register</button>
        }
        </form>
        <Link href='/login' className="link-btn">
        Already have an account? Login here.
        </Link>
    </div>
  )
}
