// src/components/common/UndoProgressBar.tsx
import React from "react";
import styles from "./UndoProgressBar.module.css";

type UndoProgressBarProps = {
  duration: number;
  onFinish?: () => void;
};

export const UndoProgressBar: React.FC<UndoProgressBarProps> = ({
  duration,
  onFinish,
}) => {
  const handleAnimationEnd = () => {
    if (onFinish) onFinish();
  };

  return (
    <div className={styles["undo-progress-container"]}>
      <div
        className={styles["undo-progress-bar"]}
        style={{ animationDuration: `${duration}ms` }}
        onAnimationEnd={handleAnimationEnd}
      />
    </div>
  );
};
