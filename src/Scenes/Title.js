import React, { Suspense } from 'react'
import { useGLTF, useProgress } from "@react-three/drei";
import styled from 'styled-components';

import Color from '../Constants/Color';
import Store from '../Utils/Store';
import { Game_Canvas, Block_Left_Top, Block_Column_End, Block_Left_End, Block_Right_End } from '../Utils/GlobalStyles';
import { setBuilding } from '../Utils/LocalStorage';
import Button from '../Utils/Button';
import Money from '../Utils/Money'
import TitleHouse from '../Elements/TitleHouse';

import playButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-21.png';
import optionButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-11.png';
import homeButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-04.png';
import shopButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-03.png';
import languageButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-09.png';
import soundButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-07.png';
import hintButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-06.png';
import cautionButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-08.png';


export default function Title() {

    return (
        <Game_Canvas className='GameCanvas'>
            <Suspense fallback={<Loader />}>
                <Block_Left_End>
                    <Button
                        handler={() => Store.setScene('itemShop')}
                        src={shopButton}
                        width={'6%'}
                        height={'10%'}
                        margin={'1%'}
                    />
                    <Button
                        handler={() => Store.setScene('buildingShop')}
                        src={homeButton}
                        width={'6%'}
                        height={'10%'}
                        margin={'1%'}
                    />
                </Block_Left_End>
                <Block_Column_End>
                    <Button
                        handler={() => Store.setScene('select')}
                        src={playButton}
                        width={'20%'}
                        height={'10%'}
                        margin={'1%'}
                    />
                    <Button
                        handler={() => Store.setScene('option')}
                        src={optionButton}
                        width={'20%'}
                        height={'10%'}
                        margin={'1%'}
                    />
                </Block_Column_End>
                <Block_Right_End>
                    <Button
                        src={hintButton}
                        width={'6%'}
                        height={'10%'}
                        margin={'1%'}
                    />
                </Block_Right_End>
                <TitleHouse />
            </Suspense>
            <Money />
            <Block_Left_Top top={"3%"}>
                <Button
                    src={soundButton}
                    width={'3%'}
                    height={'5%'}
                    margin={'0.5%'}
                />
                <Button
                    src={cautionButton}
                    width={'3%'}
                    height={'5%'}
                    margin={'0.5%'}
                />
                <Button
                    handler={() => setBuilding('tallBuilding', true)}
                    src={languageButton}
                    width={'3%'}
                    height={'5%'}
                    margin={'0.5%'}
                />
            </Block_Left_Top>
        </Game_Canvas>
    );
}

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();

    useGLTF.preload('./Models/Title/House.glb');
    useGLTF.preload('./Models/Title/Rock.glb');
    useGLTF.preload('./Models/Title/Fence1.glb');
    useGLTF.preload('./Models/Title/Fence2.glb');
    useGLTF.preload('./Models/Title/Tree.glb');
    useGLTF.preload('./Models/Title/MailBox.glb');

    useGLTF.preload('./Models/Elevator.glb');
    useGLTF.preload('./Models/House.glb');
    useGLTF.preload('./Models/RobotExpressive.glb');
    useGLTF.preload('./Models/TallBuilding.glb');

    useGLTF.preload('./Models/House/Bench.glb');
    useGLTF.preload('./Models/House/Cabinet.glb');
    useGLTF.preload('./Models/House/Cabinet2.glb');
    useGLTF.preload('./Models/House/Chair1.glb');
    useGLTF.preload('./Models/House/Chair2.glb');
    useGLTF.preload('./Models/House/Lamp.glb');
    useGLTF.preload('./Models/House/Lamp2.glb');
    useGLTF.preload('./Models/House/Structure.glb');
    useGLTF.preload('./Models/House/Structure2.glb');
    useGLTF.preload('./Models/House/Table1.glb');
    useGLTF.preload('./Models/House/Table2.glb');

    useGLTF.preload('./Models/TallBuilding/Book.glb');
    useGLTF.preload('./Models/TallBuilding/BookShelf.glb');
    useGLTF.preload('./Models/TallBuilding/BrokenGlass.glb');
    useGLTF.preload('./Models/TallBuilding/Building.glb');
    useGLTF.preload('./Models/TallBuilding/Chair.glb');
    useGLTF.preload('./Models/TallBuilding/Door.glb');
    useGLTF.preload('./Models/TallBuilding/FloorLamp.glb');
    useGLTF.preload('./Models/TallBuilding/GlassDoorShelf.glb');
    useGLTF.preload('./Models/TallBuilding/MainBuilding.glb');
    useGLTF.preload('./Models/TallBuilding/Printer.glb');
    useGLTF.preload('./Models/TallBuilding/Table.glb');
    useGLTF.preload('./Models/TallBuilding/WorkingTable1.glb');
    useGLTF.preload('./Models/TallBuilding/WorkingTable2.glb');
    useGLTF.preload('./Models/TallBuilding/WorkingTable3.glb');
    useGLTF.preload('./Models/TallBuilding/Bin.glb');

    useGLTF.preload('./Models/Elevator/Elevator.glb');
    useGLTF.preload('./Models/Elevator/Structure.glb');
    useGLTF.preload('./Models/Elevator/EmergencySupplyBox.glb');
    useGLTF.preload('./Models/Elevator/ElevatorButton.glb');
    useGLTF.preload('./Models/Elevator/ElevatorButtonPanel.glb');
    useGLTF.preload('./Models/Elevator/EmergencyButton.glb');

    useGLTF.preload('./Models/Result/TallBuilding.glb');
    useGLTF.preload('./Models/Result/Elevator.glb');
    useGLTF.preload('./Models/Result/House.glb');
    useGLTF.preload('./Models/Result/RobotExpressive1.glb');
    useGLTF.preload('./Models/Result/RobotExpressive2.glb');

    return (
        <LodingScene>
            {Math.floor(progress * 100) / 100} % loaded
            {item}
        </LodingScene>
    );
}


const LodingScene = styled.div`
    display:flex;
    position: absolute;

    width: 40vw;
    height: 20vw;

    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

    user-select: none;
    user-drag: none;

    opacity: 1;
    z-index: 500;

    align-items: center;
    justify-content: center;
    flex-direction: column;

    font-size: 3vw;
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
`;