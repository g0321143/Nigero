import styled, { createGlobalStyle } from 'styled-components';
import Color from '../Constants/Color';

export default createGlobalStyle`
    @font-face{
        font-family: 'SW721KCI';
    	src: url(/Font/Swiss721BlackCondensedBT.ttf);
    }

    body {
        margin: 0;
        font-family: SW721KCI;
    }
`;

export const Game_Canvas = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 56.25vw;
    background-color: ${Color.grayishYellowGreen};
`;

export const Block_Column_End = styled.div`
    position: absolute;
    display:flex;
    
    width: 100%;
    height: 97%;

    End: 3%;

    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`;

export const Block_Column_Top = styled.div`
    position: absolute;
    display:flex;
    
    width: 100%;
    height: 97%;

    Top: 3%;

    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export const Block_Left_Top = styled.div`
    position: absolute;
    display:flex;
    
    width: 97%;
    height: 97%;

    Top: 3%;
    left: 3%;
    
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const Block_Left_End = styled.div`
    position: absolute;
    display:flex;
    
    width: 97%;
    height: 97%;

    End: 3%;
    left: 3%;
    
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
`;

export const Block_Right_End = styled.div`
    position: absolute;
    display:flex;
    
    width: 97%;
    height: 97%;

    End: 3%;
    right: 3%;
    
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
`;