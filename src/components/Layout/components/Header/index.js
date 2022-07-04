import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

//HeadlessTippy
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faPlus, faLanguage, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faUser } from '@fortawesome/free-regular-svg-icons';
import styles from './Header.module.scss';

// import icon images from folder assets
import images from '~/assets/images';
import icons from '~/assets/icon';

//Import component
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';

// Icon component
import { MessageIcon, InboxIcon, CoinTikTokIcon, SettingIcon, KeyboardIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const MENU_ITEM = [
  {
    icon: <FontAwesomeIcon className="size-icon" icon={faLanguage} />,
    title: 'Tiếng việt',
    children: {
      title: 'Language',
      data: [
        {
          code: 'en',
          title: 'English',
        },
        {
          code: 'vi',
          title: 'Tiếng việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon className="size-icon" icon={faCircleQuestion} />,
    title: 'Phản hồi và trợ giúp',
    href: 'https://www.tiktok.com/feedback',
  },
  {
    icon: <KeyboardIcon className="size-icon" />,
    title: 'Phím tắt trên bàn phím',
  },
];

function Header() {
  const currentUser = true;

  const iconSearchRef = useRef(null);
  const [valueInput, setValueInput] = useState('');

  // Set show and hide Tippy
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  // Use check valueInput.lenght > 0 and bold icon search
  useEffect(() => {
    handleBoldIconSearch(valueInput);
  }, [valueInput]);

  // Handle
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

  const handleChangeMenuItem = (menuItem) => {
    console.log(menuItem);
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon className="size-icon" icon={faUser} />,
      title: 'View profile',
    },
    {
      icon: <CoinTikTokIcon className="size-icon" />,
      title: 'Get coins',
    },
    {
      icon: <SettingIcon className="size-icon" />,
      title: 'Settings',
    },
    ...MENU_ITEM,
    {
      icon: <FontAwesomeIcon className="size-icon" icon={faArrowRightToBracket} />,
      title: 'Log out',
      separator: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={images.logo} alt="TikTok" />

        <HeadlessTippy
          interactive
          visible={false}
          // onClickOutside={hide}
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
        >
          <div className={cx('block-search')}>
            <input
              // onFocus={() => show()}
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
        </HeadlessTippy>

        <div className={cx('actions')}>
          <Button btn_upload>
            <FontAwesomeIcon className="" icon={faPlus} />
            <span>Upload</span>
          </Button>
          {currentUser ? (
            <div className={cx('block-icons')}>
              <Tippy className={cx('tippy-custom')} delay={[0, 200]} content="Message" placement="bottom">
                <button className={cx('message')}>
                  <MessageIcon width="2.6rem" height="2.6rem" />
                </button>
              </Tippy>
              <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                <button className={cx('inbox')}>
                  <InboxIcon width="3.3rem" height="3.3rem" />
                </button>
              </Tippy>
            </div>
          ) : (
            <>
              <Button primary medium>
                Log in
              </Button>
            </>
          )}

          <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleChangeMenuItem}>
            {currentUser ? (
              <Image
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1656954000&x-signature=YLjYlY4qWwaz83q96AJqocOJYCY%3D"
                className={cx('user-avatar')}
                alt="HVT"
              />
            ) : (
              <button className={cx('more-btn')}>
                <img className={cx('more-icon')} src={icons.more_icon} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
