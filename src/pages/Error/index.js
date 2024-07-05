import classNames from "classnames/bind";
import styles from "./Error.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const cx = classNames.bind(styles);

function Error() {
  const navigate = useNavigate();

  return (
    <div id={cx("error-page")}>
      <h1>Lỗi!</h1>
      <p>Xin lỗi, có vẻ như đã có lỗi.</p>
      <Link to='/'>
        <Button variant='outlined'>Quay về trang chủ</Button>
      </Link>
    </div>
  );
}

export default Error;
