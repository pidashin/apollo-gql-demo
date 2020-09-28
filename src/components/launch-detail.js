import React from 'react';
import styles from './launch-detail.module.scss'

import { getBackgroundImage } from './launch-tile';

const LaunchDetail = ({ id, site, rocket }) => (
  <div
    className={styles.card}
    style={{
      backgroundImage: getBackgroundImage(id),
    }}
  >
    <h3>
      {rocket && rocket.name} ({rocket && rocket.type})
    </h3>
    <h5>{site}</h5>
  </div>
)


export default LaunchDetail;
