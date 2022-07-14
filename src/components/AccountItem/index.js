import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountItem.module.scss';

import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
      <Image className={cx('avatar')} src={data.avatar} alt="Demo" />
      <div>
        <p className={cx('name')}>
          <span>{data.nickname}</span>
          {data.tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCircleCheck} />}
        </p>
        <span className={cx('username')}>{data.full_name}</span>
      </div>
    </Link>
  );
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
