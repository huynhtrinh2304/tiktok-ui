import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  return (
    <div className={cx('item')} onClick={onClick}>
      {data.icon}
      <span>{data.title}</span>
    </div>
  );
}

export default MenuItem;
