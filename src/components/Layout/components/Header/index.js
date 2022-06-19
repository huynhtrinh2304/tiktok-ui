import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
// import icon images from folder assets
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
  const iconSearchRef = useRef(null);
  const [value, setValue] = useState('');

  const handleChangeInput = (e) => {
    changeIconSearch(e.target.value);
    setValue((prev) => (prev = e.target.value));
  };

  const changeIconSearch = (value) => {
    if (value.length > 0) {
      iconSearchRef.current.src = images.search_icon_bold;
    } else {
      iconSearchRef.current.src = images.search_icon;
    }
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="TikTok" />
        </div>

        <div className={cx('block-search')}>
          <input
            value={value}
            onChange={handleChangeInput}
            placeholder="Search accounts and videos"
            spellCheck={false}
          ></input>
          <button className={cx('clear')}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
          <span className={cx('splitter')}></span>
          <button className={cx('search-btn')}>
            <img ref={iconSearchRef} src={images.search_icon} alt="Search" />
          </button>
        </div>

        <div className={cx('actions')}></div>
      </div>
    </header>
  );
}

export default Header;
