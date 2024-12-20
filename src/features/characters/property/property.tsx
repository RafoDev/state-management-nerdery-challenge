import styles from "./property.module.scss";
type PropertyType = {
  property: string;
  value: string;
};

export const Property = ({ property, value }: PropertyType) => {
  return (
    <div className={styles.container}>
      <span className={styles.prop}>{property}</span>{" "}
      <span className={styles.value}>{value}</span>
    </div>
  );
};
