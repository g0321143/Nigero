import React, { useRef, useState } from 'react'

import Game from './GlobalStyles';
import Title from './Scenes/Title';

export default function App() {

    const [scene, setScene] = useState('title');
    console.log(scene);

    return (
        <>
            {(scene == 'title') &&
                <Title/>
            }
        </>
    );
}

