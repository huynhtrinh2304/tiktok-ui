import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  onClick,
  primary = false,
  outline = false,
  btn_upload,
  rounded,
  small,
  medium,
  large,
  children,
  disabled,
  ...passProps
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  // Remove event listener when btn disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const className = cx('wrapper', {
    primary,
    outline,
    small,
    medium,
    large,
    btn_upload,
    rounded,
  });

  return (
    <Comp className={className} {...props}>
      <span>{children}</span>
    </Comp>
  );
}

Button.propTypes = {
  rounded: PropTypes.bool,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  btn_upload: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string,
  small: PropTypes.string,
  medium: PropTypes.string,
  large: PropTypes.string,
  disabled: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
