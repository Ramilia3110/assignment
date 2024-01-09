import React from "react";
import styles from "./card.module.css";

const Card = ({ items }) => {
  return (
    <div className={styles.container}>
      {items &&
        items.map((item) => (
          <div key={item.id} className={styles.card}>
            <img
              src={item.sites[0].logoSmall2x}
              alt="linkedin logo"
              className={styles.img}
            />
            <h4>{item.title}</h4>
            <p className={styles["card-text"]}>{item.shortDescription}</p>
          </div>
        ))}
    </div>
  );
};

export default Card;
