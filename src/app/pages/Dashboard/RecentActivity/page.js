"use client";

import styles from './RecentActivity.module.css';
import { MdPlayCircle } from 'react-icons/md';
import Image from 'next/image';

const rightbar = () => {

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image src='/asd' width={180}
                    alt='asd'
                        height={45} />
                </div>
                <div className={styles.texts}>
                    <span className={styles.notification}>Available Now</span>
                    <h3 className={styles.title}>
                        How to use the new version
                    </h3>
                    <span className={styles.subtitle}>takes 4 minjte</span>
                    <p className={styles.desc}>
                        akjsdhskdbaskjfbksjdf
                        ashkshfksdbnksdjfbksdjfbkdsfbk

                    </p>
                    <button className={styles.button}>
                        <MdPlayCircle />
                        Watch
                    </button>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image src='/asd' width={180}
                    alt='asd'
                        height={45} />
                </div>
                <div className={styles.texts}>
                    <span className={styles.notification}>Available Now</span>
                    <h3 className={styles.title}>
                        How to use the new version
                    </h3>
                    <span className={styles.subtitle}>takes 4 minjte</span>
                    <p className={styles.desc}>
                        akjsdhskdbaskjfbksjdf
                        ashkshfksdbnksdjfbksdjfbkdsfbk

                    </p>
                    <button className={styles.button}>
                        <MdPlayCircle />
                        Watch
                    </button>
                </div>
            </div>
        </div>
    )
}

export default rightbar