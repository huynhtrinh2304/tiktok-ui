import PropTypes from 'prop-types';
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
      <span className="ml-4">{data.title}</span>
    </div>
  );
}

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
