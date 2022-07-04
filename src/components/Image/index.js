import { useState } from 'react';
import images from '~/assets/images';

function Image({ src, ...props }) {
  const [fallback, setFallback] = useState('');

  const handleError = () => {
    setFallback(images.noImage);
  };

  return <img src={fallback || src} {...props} onError={handleError} />;
}

export default Image;
