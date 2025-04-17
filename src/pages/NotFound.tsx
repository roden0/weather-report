import { Link } from "react-router";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className={styles.link}>
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
