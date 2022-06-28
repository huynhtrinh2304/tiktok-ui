import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

//Tippy
import Tippy from '@tippyjs/react/headless';

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faPlus, faLanguage, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import styles from './Header.module.scss';

// import icon images from folder assets
import images from '~/assets/images';
import icons from '~/assets/icon';

//Import component
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MENU_ITEM = [
  {
    icon: <FontAwesomeIcon className="mr-4 size-icon" icon={faLanguage} />,
    title: 'Tiếng việt',
    type: 'tippy',
  },
  {
    icon: <FontAwesomeIcon className="mr-4 size-icon" icon={faCircleQuestion} />,
    title: 'Phản hồi và trợ giúp',
    type: 'link',
    href: 'https://www.tiktok.com/feedback',
  },
  {
    icon: <FontAwesomeIcon className="mr-4 size-icon" icon={faKeyboard} />,
    title: 'Phím tắt trên bàn phím',
    type: 'popup',
  },
];

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
          interactive
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

        <div className={cx('actions')}>
          <Button btn_upload>
            <FontAwesomeIcon className="mr-4" icon={faPlus} />
            <span>Upload</span>
          </Button>

          <Button primary medium>
            Sign in
          </Button>

          <Menu items={MENU_ITEM}>
            <button className={cx('more-btn')}>
              <img className={cx('more-icon')} src={icons.more_icon} />
            </button>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
