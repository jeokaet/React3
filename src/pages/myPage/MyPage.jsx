import React from 'react';
import styles from "./MyPage.module.css";

function MyPage () {
    return (
        <div className={styles.div}>
            <ul className={styles.menu}>
                <li>마이페이지</li>
                <li>나의 여행기록</li>
            </ul>
            <div className={styles.info}>
                myinfo
            </div>
        </div>
        
    )
}

export default MyPage;