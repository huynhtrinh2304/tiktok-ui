import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

// Component
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Menu({ children, items }) {
  let TypeWrapper = '';

  return (
    <Tippy
      delay={[0, 700]}
      interactive
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {items.map((item, index) => {
              if (item.type === 'link') {
                TypeWrapper = 'a';
              } else {
                TypeWrapper = 'div';
              }
              return (
                <TypeWrapper href={item.href} className={cx('item')} key={index}>
                  {item.icon}
                  <span>{item.title}</span>
                </TypeWrapper>
              );
            })}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
