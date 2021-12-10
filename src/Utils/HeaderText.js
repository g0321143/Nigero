import styled from 'styled-components';
import Color from '../Constants/Color';
import PropTypes from 'prop-types';

const Text = styled.div`
  position: absolute;

  width: 100%;
  height: 3vw;

  top: 3%;

  font-size: 3vw;
  color: ${Color.slightlyGrayishYellow};
  font-weight: bold;
  justify-content: flex-end;
  text-align: center;

  user-select: none;
  user-drag: none;
  
  z-index: 999;
`;

function HeaderText({ text }) {

  return (
    <>
      <Text>{text}</Text>
    </>
  );
}

HeaderText.propTypes = {
    text: PropTypes.string,
};

HeaderText.defaultProps = {
    text: '',
};

export default HeaderText;
