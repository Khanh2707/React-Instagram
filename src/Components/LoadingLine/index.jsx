import classNames from "classnames/bind";
import styles from "./LoadingLine.module.css";

const cx = classNames.bind(styles);

function LoadingLine() {
  return (
    <div className={cx("loading-line")}>
      {/* Dòng chạy từ trái qua phải */}
      <div className={cx("line")}></div>
    </div>
  );
}

export default LoadingLine;
