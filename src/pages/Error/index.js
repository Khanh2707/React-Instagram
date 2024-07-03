import classNames from 'classnames/bind';
import styles from './Error.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const cx = classNames.bind(styles)

function Error() {
    const navigate = useNavigate();

    const handleNavigateToHome = () => {
        navigate('/');
    }

    return (
        <div id={cx('error-page')}>
            <h1>Lỗi!</h1>
            <p>Xin lỗi, có vẻ như đã có lỗi.</p>
            <Button variant='outlined' onClick={handleNavigateToHome}>
                Quay về trang chủ
            </Button>
        </div>
    )
}

export default Error;