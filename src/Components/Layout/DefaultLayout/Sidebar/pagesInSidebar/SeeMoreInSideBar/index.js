import classNames from 'classnames/bind';
import styles from './SeeMoreInSideBar.module.css';

const cx = classNames.bind(styles)

function SeeMoreInSideBar({ seeMoreInSidebar }) {
    
    return (
        <div className={cx("page-see_more", { 'active': seeMoreInSidebar })}>
            <ul>
                <li>
                    <svg aria-label="Cài đặt" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor"
                        height="18" role="img" viewBox="0 0 24 24" width="18">
                        <title>Cài đặt</title>
                        <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                        <path
                            d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                            fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
                        </path>
                    </svg>
                    <span>Cài đặt</span>
                </li>
                {/* <li>
                    <svg aria-label="Báo cáo sự cố" className={cx("x1lliihq x1n2onr6 x5n08af")} fill="currentColor"
                        height="18" role="img" viewBox="0 0 24 24" width="18">
                        <title>Báo cáo sự cố</title>
                        <path
                            d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z">
                        </path>
                    </svg>
                    <span>Báo cáo sự cố</span>
                </li> */}
                {/* <div className={cx("gap_large_in_see_more")}></div> */}
                <div className={cx("gap_small_in_see_more")}></div>
                <li>
                    <span>Chuyển tài khoản</span>
                </li>
                <div className={cx("gap_small_in_see_more")}></div>
                <li>
                    <span>Đăng xuất</span>
                </li>
            </ul>
        </div>
    )
}

export default SeeMoreInSideBar;