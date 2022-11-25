import React, { useState } from 'react'
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfieModal from '../profileModal/ProfileModal'

const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className='infoCard'>
        <div className="infoHead">
            <h4>Your Info</h4>
            <div>
            <UilPen onClick={()=>setModalOpened(true)}/>
            <ProfieModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
            </div>
        </div>
        <div className="info">
            <span>
                <b>Status</b>
            </span>
            <span>  In Relationship</span>
        </div>
        <div className="info">
            <span>
                <b>Lives in</b>
            </span>
            <span>  Nepal</span>
        </div>
        <div className="info">
            <span>
                <b>Works at</b>
            </span>
            <span>  Tero bau le jagir dya xa ra</span>
        </div>

        <button className='button logout-button'> Logout</button>
    </div>
  )
}

export default InfoCard