import React from 'react'
import Link from 'next/link'
import styles from './launch-tile.module.scss'

import galaxy from '../../public/images/galaxy.jpg'
import iss from '../../public/images/iss.jpg'
import moon from '../../public/images/moon.jpg'

const backgrounds = [galaxy, iss, moon]
export const getBackgroundImage = id => {
  const _id = isNaN(id) ? atob(id).replace(/launch:/, '') : id

  return `url(${backgrounds[Number(_id) % backgrounds.length]})`
}

const LaunchTile = ({ launch }) => {
  const { id, mission, rocket } = launch

  return (
    <Link href={`/launch/${id}`}>
      <div
        className={styles.link}
        style={{
          backgroundImage: getBackgroundImage(id)
        }}
      >
        <h3>{mission.name}</h3>
        <h5>{rocket.name}</h5>
      </div>
    </Link>
  )
}

export default LaunchTile
