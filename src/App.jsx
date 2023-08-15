import { useState } from 'react'
import './App.css'
import styles from './styles/home.module.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className={styles.head}>
        Car pooling
      </div>
      <div id={styles.red} className={styles.button}>Reguster for car pooling</div>
      <div id={styles.green} className={styles.button}>Check available pooling</div>

    </>
  )
}

export default App
