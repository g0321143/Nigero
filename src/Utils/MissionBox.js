import React from 'react'
import styled from 'styled-components'
import Color from '../Constants/Color';

import missionBackground from '../Assets/Images/MissionBox.png';
import missonUncheck from '../Assets/Images/Misson_Uncheck.png';
import MissionCheched from '../Assets/Images/Mission_Cheched.png';

/**
 * ミッションの表示と達成状況を表示します
 * @param {[string, string, string]}  missionText ミッションのテキストの配列
 * @param {[boolean, boolean, boolean]}  isCheckedMission ミッションを達成したかどうか
 */
const MissionBox = ({ missionText, isCheckedMission }) => {

    return (
        <MissionBoxSC>
            <Mission>{"●" + missionText[0]}</Mission>
            <CheckBox src={isCheckedMission[0] ? MissionCheched : missonUncheck}/>
            <Mission>{"●" + missionText[1]}</Mission>
            <CheckBox src={isCheckedMission[1] ? MissionCheched : missonUncheck}/>
            <Mission>{"●" + missionText[2]}</Mission>
            <CheckBox src={isCheckedMission[2] ? MissionCheched : missonUncheck}/>
        </MissionBoxSC>
    )
};

const MissionBoxSC = styled.div`
    display:flex;
    position: absolute;

    width: 20vw;
    height: 32vw;

    top 20%;
    left 2%;

    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;

    background-image: url(${missionBackground});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.9;

    z-index: 500;

    :hover {
        opacity: 1;
    }
    
  
    user-select: none;
    user-drag: none;
`;

const Mission = styled.div`
    display: flex;
    position: relative;

    width: 64%;
    left: 1.5vw;
    top: 15%;

    flex-direction: column;
    font-size: 1.5vw;
    
    word-break: break-word;
    overflow-wrap: break-word;
    color: ${Color.slightlyGrayishYellow};
    
    margin-left: 1.4em;
    margin-bottom: 5%;
	text-indent: -1em;

`;

const CheckBox = styled.img`
    display: flex;
    position: relative;
    
    top: 15%;
    left: 1vw;
    margin-top: 1%;

    url(${(props) => props.src});
    width: 10%;
`;

export default MissionBox