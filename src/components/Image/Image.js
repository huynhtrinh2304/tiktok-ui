import { useState } from 'react';
import PropTypes from 'prop-types';
import images from '~/assets/images';

function Image({ src, alt, ...props }) {
  const [fallback, setFallback] = useState('');

  const handleError = () => {
    setFallback(images.noImage);
  };

  return <img src={fallback || src} {...props} onError={handleError} alt={alt} />;
}

Image.prototype = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
