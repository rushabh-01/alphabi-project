'use client';

import { useEffect } from 'react';
import Searchbar from '@/component/Searchbar';
import styles from './page.module.css';

function disableBackButton() {
  window.history.pushState(null, '', window.location.href);
  window.addEventListener('popstate', handlePopstate);
}

function handlePopstate() {
  window.history.pushState(null, '', window.location.href);
}

export default function Dashboard() {
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
