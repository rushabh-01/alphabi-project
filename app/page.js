
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 style={{fontSize:50}}>NextJS Firebase Auth</h1>
      <ul>
        <li>The project is seamlessly integrated with Firebase to provide easy authentication for users via email and password.</li>
        <li>We have implemented the Giphy API to showcase a dynamic gallery of GIFs based on user search keywords, adding an element of fun to the browsing experience.</li>
        <li>The gallery also features a pagination system that allows users to easily navigate through large collections of GIFs without feeling overwhelmed.</li>
        <li>In addition to this, we have also implemented a hot search feature that updates search results in real-time without requiring the user to press the search button repeatedly.</li>
        <li>Lastly, we have added loading animations to provide users with visual feedback during moments of transition, keeping the browsing experience smooth and seamless.</li>
      </ul>
    </main>
  )
}
