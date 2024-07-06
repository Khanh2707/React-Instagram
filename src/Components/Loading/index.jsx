import classNames from "classnames/bind";
import styles from "./Loading.module.css";

const cx = classNames.bind(styles);

function Loading() {
  return <div id={cx("loading")}></div>;
}

export default Loading;
