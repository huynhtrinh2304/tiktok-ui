import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  const classes = cx('item', {
    separator: data.separator,
  });

  return (
    <div className={classes} onClick={onClick}>
      {data.icon}
      <span>{data.title}</span>
    </div>
  );
}

export default MenuItem;
