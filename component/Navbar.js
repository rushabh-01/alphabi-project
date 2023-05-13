'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Navbar() {
  const [profile, setProfile] = useState(null);
  const { user,logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve user data from local storage
    if (user) {
      const userData = localStorage.getItem(user.uid)
      setProfile(JSON.parse(userData))
    } else {
      setProfile(null)
    }
  }, [user])

  const handleLogout = async () => {
    setLoading(true);
    await logout()
    router.push('/login')
    setLoading(false)
  }

  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    window.innerWidth <= 768 ? setMobile(true) : setMobile(false);
  }, [mobile]);

  return (
    <nav>
      {loading && ( // conditional rendering for loader
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h2>Loading...</h2>
        </div>
      )}
      <div className="navbarsection">
        {profile ? mobile ? 
        <Link href="/">
        <Image 
        src="/next.svg" 
        alt="" 
        width={70}
        height={70}
        />
        </Link>
        :
        <h3>
          NextJS Firebase Auth
        </h3> :
        <h3>
        <Link href="/">
        <Image 
        src="/next.svg" 
        alt="" 
        width={100}
        height={100}
        />
        </Link>
      </h3>
        }
        <>
          {profile ? (
            <div className="navbar-user-section">
              {mobile ? '':<p>Welcome, {user ? user.email : ''}</p>}
              <p className="logout" onClick={handleLogout}>Logout</p>
            </div>
          ) : (
            <div className="navbar-empty-section">
              <Link href="/signup">Sign up</Link>
              <Link href="/login">Login</Link>
            </div>
          )}
        </>
      </div>
    </nav>
  );
}
