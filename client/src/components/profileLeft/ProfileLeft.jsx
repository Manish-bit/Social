import React from 'react'
import FollowersCard from '../followers/FollowersCard'
import InfoCard from '../infoCard/InfoCard'
import LogoSearch from '../logoSearch/LogoSearch'

const ProfileLeft = () => {
  return (
    <div className='profileSide'>
        <LogoSearch/>
        <InfoCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft