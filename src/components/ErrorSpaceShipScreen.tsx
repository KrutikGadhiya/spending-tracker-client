import styles from "../css/ErrorSpaceShipScreen.module.css";

const ErrorSpaceShipScreen = ({ error }: { error: string }) => {
  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <h1>Hmm.</h1>
        <p>{error}</p>
      </div>
      <div className={styles.space}>
        <div className={styles.blackhole}></div>
        <div className={styles.ship}></div>
      </div>
    </div>
  );
};

export default ErrorSpaceShipScreen;
