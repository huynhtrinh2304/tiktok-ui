import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

//HeadlessTippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLanguage, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faUser } from '@fortawesome/free-regular-svg-icons';
import styles from './Header.module.scss';

// import icon images from folder assets
import images from '~/assets/images';
import icons from '~/assets/icon';

//Import component
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';

// Icon component
import { MessageIcon, InboxIcon, CoinTikTokIcon, SettingIcon, KeyboardIcon } from '~/components/Icons';

//routes config
import config from '~/config';

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
        <Link to={config.routes.home} className={cx('logo-link')}>
          <img src={images.logo} alt="TikTok" />
        </Link>

        <Search />

        <div className={cx('actions')}>
          <Button btn_upload>
            <FontAwesomeIcon className="mr-4" icon={faPlus} />
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
