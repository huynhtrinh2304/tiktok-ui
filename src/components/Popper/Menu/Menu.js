import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Menu.module.scss';

// Component
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

import icons from '~/assets/icon';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);

  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          data={item}
          key={index}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const renderResultMenuItem = (attrs) => (
    <div className={cx('content')} tabIndex="-1" {...attrs}>
      <img className={cx('arrow-tippy')} src={icons.arrow_tippy} alt={'icon'} />
      <PopperWrapper>
        {history.length > 1 && (
          <Header
            title={current.title}
            onBack={() => {
              setHistory((prev) => prev.slice(0, prev.length - 1));
            }}
          />
        )}
        <div className={cx('list-menu-item')}>{renderItems()}</div>
      </PopperWrapper>
    </div>
  );

  const handleBackFirstMenu = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      offset={[10, 13]}
      delay={[0, 700]}
      interactive
      placement="bottom-end"
      hideOnClick={false}
      render={renderResultMenuItem}
      onHide={handleBackFirstMenu}
    >
      <div className={cx('block')}>{children}</div>
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

export default Menu;
