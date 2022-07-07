import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountItem.module.scss';

import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <Image
        className={cx('avatar')}
        src="https://www.shareicon.net/data/128x128/2016/05/29/772559_user_512x512.png"
        alt="Demo"
      />
      <div>
        <p className={cx('name')}>
          <span>Asmobillet</span>
          <FontAwesomeIcon className={cx('icon-check')} icon={faCircleCheck} />
        </p>
        <span className={cx('username')}>Nguyễn Hữu Sang</span>
      </div>
    </div>
  );
}

export default AccountItem;
