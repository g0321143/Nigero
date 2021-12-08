import styled, { createGlobalStyle } from 'styled-components';
import { Canvas as c } from '@react-three/fiber';

export default createGlobalStyle`
  body {
    margin: 0;
    background: white;
    font-family: "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif";
  }
`;

export const Game_Canvas = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: #e6df97;
`;

export const Block_Column_End = styled.div`
    position: absolute;
    display:flex;
    
    width: 100%;
    height: 100%;

    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`;

export const Block_Column_Top = styled.div`
    position: absolute;
    display:flex;
    
    width: 100%;
    height: 100%;

    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export const Block_Left_Top = styled.div`
    position: absolute;
    display:flex;
    
    width: 100%;
    height: 100%;
    
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const Block_Left_End = styled.div`
    position: absolute;
    display:flex;
    
    width: 100%;
    height: 100%;
    
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
`;

export const Block_Right_End = styled.div`
    position: absolute;
    display:flex;
    
    width: 100%;
    height: 100%;
    
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
`;