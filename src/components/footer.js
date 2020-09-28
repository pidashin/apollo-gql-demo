import React from 'react'
import styles from './footer.module.scss'

import MenuItem from './menu-item';
import LogoutButton from '../containers/logout-button';
import { ReactComponent as HomeIcon } from '../../public/icons/home.svg';
import { ReactComponent as CartIcon } from '../../public/icons/cart.svg';
import { ReactComponent as ProfileIcon } from '../../public/icons/profile.svg';


const Footer = () => (
  <footer className={styles.container}>
    <div className={styles.inner}>
      <MenuItem href="/">
        <HomeIcon />
          Home
        </MenuItem>
      <MenuItem href="/cart">
        <CartIcon />
          Cart
        </MenuItem>
      <MenuItem href="/profile">
        <ProfileIcon />
          Profile
        </MenuItem>
      <LogoutButton />
    </div>
  </footer>
);

export default Footer