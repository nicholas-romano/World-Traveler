import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          You travel the world.
          <br />
          World Traveler keeps track of your adventures.
        </h1>
        <h2>
          Track your travels and document your experiences from all around the
          world. <br />
          Share your exciting memories with your friends and family.
        </h2>
        <Link to="/app/cities" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
