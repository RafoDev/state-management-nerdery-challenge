import { ReactNode } from "react";
import styles from "./loading.module.scss";

type LoadingProps = {
  children?: ReactNode;
};

export const Loading = ({ children }: LoadingProps) => {
  return (
    <div className={styles.container}>
      <span>{children}</span>
  </div>
  );
};
