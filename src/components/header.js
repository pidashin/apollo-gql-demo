import React from 'react';
import { useQuery, gql } from '@apollo/client'
import styles from './header.module.scss'

import dog1 from '../../public/images/dog-1.png';
import dog2 from '../../public/images/dog-2.png';
import dog3 from '../../public/images/dog-3.png';


const max = 25; // 25 letters in the alphabet
const offset = 97; // letter A's charcode is 97
const avatars = [dog1, dog2, dog3];
const maxIndex = avatars.length - 1;

const pickAvatarByEmail = (email) => {
  const charCode = email.toLowerCase().charCodeAt(0) - offset;
  const percentile = Math.max(0, Math.min(max, charCode)) / max;
  return avatars[Math.round(maxIndex * percentile)];
}

const GET_USER = gql`
  query GetUser {
    me {
      email
    }
  }
`

const Header = ({ image, children = 'Space Explorer' }) => {

  const { data } = useQuery(GET_USER)
  const email = !!data ? data.me.email : null
  const avatar = image || (!!email ? pickAvatarByEmail(email) : avatars[0]);

  return (
    <div className={styles.container}>
      <img className={styles.img} src={avatar} alt="Space dog" />
      <div>
        <h2>{children}</h2>
        <h5 className={styles.subHeading}>{email}</h5>
      </div>
    </div>
  );
}

export default Header