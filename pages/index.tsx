import type { NextPage } from "next";
import Head from "next/head";
import App from "../modules/App";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>What&apos;s Ours Is Mine</title>
        <meta name="description" content="Kramer vs. Kramer meets Poker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <App />
    </div>
  );
};

export default Home;
