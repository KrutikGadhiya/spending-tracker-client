import styles from "../css/LoaderScreen.module.css";

const LoaderScreen = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.cube}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderScreen;
