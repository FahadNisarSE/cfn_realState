import React from "react";
import Link from "next/link";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <div className={styles.navbar}>
      <div className={styles.navTitle}>
        <Link href="/"><h1>Realtor</h1></Link>
      </div>
      <div onClick={() => setIsActive(prev => !prev)} >
        <button className={styles.navButton}>
          <FcMenu className={styles.icon} />
        </button>
      </div>
      {isActive && (
        <ul id={styles.menu}>
          <Link href="/" passHref>
          <li className={styles.menuItem} onClick={() => setIsActive(prev =>!prev)}>
            
              <a>
                <FcHome className={styles.icons} /> Home
              </a>
          </li>
          </Link>

            <Link href="/search" passHref>
          <li className={styles.menuItem} onClick={() => setIsActive(prev =>!prev)}>
              <a>
                <BsSearch className={styles.icons} /> Search
              </a>
          </li>
            </Link>
            <Link href="/search?purpose=for-sale" passHref>
          <li className={styles.menuItem} onClick={() => setIsActive(prev =>!prev)}>
              <a>
                <FcAbout className={styles.icons} /> Buy Property
              </a>
          </li>
            </Link>
            <Link href="/search?purpose=for-rent" passHref>
          <li className={styles.menuItem} onClick={() => setIsActive(prev =>!prev)}>
              <a>
                <FiKey className={styles.icons} /> Rent Property
              </a>
          </li>
            </Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
