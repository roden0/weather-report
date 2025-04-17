"use client"

import type { FC } from "react"
import styles from "./Home.module.scss"

interface HomeProps {
  count: number
  setCount: (count: number) => void
}

const Home: FC<HomeProps> = ({ count, setCount }) => {
  return (
    <div className={styles.home}>
      <h1>Home Page</h1>
      <div className={styles.card}>
        <button type="button" onClick={() => setCount(count + 1)}>
          Count is {count}
        </button>
        <p>
          Edit <code>src/pages/Home.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default Home
