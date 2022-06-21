import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
//Tippy
import Tippy from '@tippyjs/react/headless';
//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
// import icon images from folder assets
import images from '~/assets/images';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Header() {
  const iconSearchRef = useRef(null);
  const [valueInput, setValueInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  // Set show and hide Tippy
  const [visible, setVisible] = useState(true);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  // Use check valueInput.lenght > 0 and bold icon search
  useEffect(() => {
    handleBoldIconSearch(valueInput);
  }, [valueInput]);

  useEffect(() => {
    setTimeout(() => setSearchResult([1, 2, 3, 4]), 0);
  }, []);

  const handleChangeInput = (e) => {
    setValueInput(e.target.value);
  };

  const handleBoldIconSearch = (value) => {
    if (value.length > 0) {
      iconSearchRef.current.src = images.search_icon_bold;
    } else {
      iconSearchRef.current.src = images.search_icon;
    }
  };

  const handleClearInput = () => setValueInput('');

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={images.logo} alt="TikTok" />

        <Tippy
          interactive="top-start"
          render={(attrs) => (
            <div className={cx('search-results')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
          visible={visible}
          onClickOutside={hide}
        >
          <div className={cx('block-search')}>
            <input
              onFocus={() => setVisible(true)}
              value={valueInput}
              onChange={handleChangeInput}
              placeholder="Search accounts and videos"
              spellCheck={false}
            ></input>

            <button className={cx('clear')} onClick={handleClearInput}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>

            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

            <span className={cx('splitter')}></span>

            <button className={cx('search-btn')}>
              <img ref={iconSearchRef} src={images.search_icon} alt="Search" />
            </button>
          </div>
        </Tippy>

        <div className={cx('actions')}></div>
      </div>
    </header>
  );
}

export default Header;
