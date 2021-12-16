import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Color from '../Constants/Color';

const Tab = ({ title, content }) => {

    // [a-v]と[0-9]の間でランダムな文字列を生成
    const randomStr = () => Math.random().toString(32).substring(2);
    // タブのIDを格納する配列
    const randomId = useRef([]);
    // レンダリングされた回数
    const renderCount = useRef(0);

    // 要素を追加
    if (renderCount.current === 0) {
        for (let i = 0, len = title.length; i < len; i++) {
            randomId.current.push(`tab-${randomStr()}`);
        }
        renderCount.current++;
    }

    // タブの状態
    const [tabState, setTabState] = useState(randomId.current[0]);

    // クリックした時にtabStateに
    const handleClick = (e) => {
        e.preventDefault();
        setTabState(`${e.currentTarget.getAttribute('aria-controls')}`);
    }

    return (
        <TabSC>
            <ul className="tablist" role="tablist">
                {title.map((title, index) => (
                    <li role="presentation" key={randomId.current[index]}>
                        <a
                            href={`#${randomId.current[index]}`}
                            tabIndex={tabState === randomId.current[index] ? 0 : -1}
                            role="tab"
                            aria-controls={randomId.current[index]}
                            aria-selected={tabState === randomId.current[index]}
                            onClick={(e) => handleClick(e)}
                        >
                            {title}
                        </a>
                    </li>
                ))}
            </ul>
            <div>
                {content.map((content, index) => (
                    <div
                        id={randomId.current[index]}
                        key={randomId.current[index]}
                        hidden={tabState === randomId.current[index] ? false : true}
                        role="tabpanel"
                    >
                        {content}
                    </div>
                ))}
            </div>
        </TabSC>
    )
};

const TabSC = styled.div`
    > ul[role="tablist"] {
        display: flex;
        padding: 0;
        margin-block: 0;
        font-size: 2vw;
        font-weight: bold;
        
        > li {
            margin-right: 1vw;
            list-style: none;
            background-color: #ddd;
            border-radius: 1vw;
            box-shadow: 0 0.4vw 0.4vw rgba(0,0,0,0.2), 0 -0.4vw 1vw -0.4vw #6d95ce inset;
        > a {
            display: block;
            padding: 0.5vw 3vw;
            text-decoration: none;
            color: ${Color.slightlyGrayishYellow};
            transition: 0.5s;
            
            &[aria-selected="true"] {
                background-color: ${Color.softYellow};
                border-radius: 1vw;
                transition: 0.5s;
            }
        }
    }
  }
  div[role="tabpanel"] {
    margin-top: 1vw;
    padding: 2vw 2vw;
    background-color: ${Color.softYellow};
    border-radius: 2vw 0 0 2vw;
    height: 31vw;
    overflow-y: scroll;
  }
`;

export default Tab