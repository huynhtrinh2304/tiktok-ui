import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
  return (
    <header className={cx('header-list')}>
      <FontAwesomeIcon
        className={cx('icon-back')}
        icon={faAngleLeft}
        onClick={() => {
          onBack();
        }}
      />
      <span>{title}</span>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Header;
