'use client';

import { useEffect } from 'react';
import Searchbar from '@/component/Searchbar';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function disableBackButton() {
  window.history.pushState(null, '', window.location.href);
  window.addEventListener('popstate', handlePopstate);
}

function handlePopstate() {
  window.history.pushState(null, '', window.location.href);
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  useEffect(() => {
    disableBackButton();
    return () => {
      window.removeEventListener('popstate', handlePopstate);
      window.history.replaceState(null, '', window.location.href);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Searchbar />
    </div>
  );
}


