import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChooserButton = styled.div`
  display:flex;
  
  width: ${props => props.width};
  height: ${props => props.height};

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

function Button({ handler, src, width, height }) {
    return (
        <ChooserButton onClick={handler} src={src} width={width} height={height}/>
    );
}

// props ごとの型定義を記述 (jsだと型宣言ができないのでprop-typesを追加して，指定してる)
Button.propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    handler: PropTypes.func
};

// props ごとのデフォルトの値
Button.defaultProps = {
    src: '',
    width: '200px',
    height: '200px',
    handler: () => { }
};

export default Button;
