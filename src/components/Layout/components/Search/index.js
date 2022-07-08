import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss';

//Import component
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';

import { SearchIcon, LoadingIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputSearchRef = useRef();
  const debounced = useDebounce(searchValue, 500);

  // search user
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    fetchApiSearchUser();
  }, [debounced]);

  const handleClearInput = () => {
    setSearchValue('');
    setSearchResult([]);
    inputSearchRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const fetchApiSearchUser = () => {
    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <HeadlessTippy
      interactive
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <div className={cx('search-results')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx('search-title')}>Accounts</h4>
            {searchResult.map((result) => (
              <AccountItem key={result.id} data={result} />
            ))}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('block-search')}>
        <input
          ref={inputSearchRef}
          value={searchValue}
          onFocus={() => setShowResult(true)}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search accounts and videos"
        />

        {searchValue && loading == false && (
          <button className={cx('clear')} onClick={() => handleClearInput()}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {loading == true && <LoadingIcon className={cx('loading')} />}

        <span className={cx('splitter')}></span>

        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
