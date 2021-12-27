import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChooserButton = styled.div`
  display:flex;
  
  width: ${props => props.width};
  height: ${props => props.height};
  
  margin: ${props => props.margin};

  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.9;
  z-index: 999;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

/**
 * 任意の画像を使ったボタンを作成します
 * @param {function} handler ボタンをクリックした時のハンドルがリターンされます
 * @param {String} src ボタンの画像です
 * @param {String} width ボタンの横幅です
 * @param {String} height ボタンの縦幅です
 * @param {String} margin ボタンのマージンです
 */
function Button({ handler, src, width, height, margin }) {
    return (
        <ChooserButton onClick={handler} src={src} width={width} height={height} margin={margin}/>
    );
}

// props ごとの型定義を記述 (jsだと型宣言ができないのでprop-typesを追加して，指定してる)
Button.propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    handler: PropTypes.func
};

// props ごとのデフォルトの値
Button.defaultProps = {
    src: '',
    width: '10%',
    height: '10%',
    margin: '5%',
    handler: () => { }
};

export default Button;
