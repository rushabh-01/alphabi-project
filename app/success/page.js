
import Link from 'next/link'
import styles from './page.module.css'

export default function Success() {
  return (
    <>
    <div className={styles.success}>
    <h1 style={{color:'green'}}>Successfully Registered</h1>
    <p>You can log in now</p>
    <button>
        <Link href='login'>
        Go to login page
        </Link>
    </button>
    </div>
    </>
  )
}
