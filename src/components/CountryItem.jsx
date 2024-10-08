import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";

function CountryItem({ country }) {
  CountryItem.propTypes = {
    country: PropTypes.object,
  };

  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
