import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import * as searchService from '~/services/searchService';

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
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputSearchRef = useRef();
  const debouncedValue = useDebounce(searchValue, 500);

  // search user
  useEffect(() => {
    const fetchApiSearchUser = async () => {
      setLoading(true);
      const searchResult = await searchService.search(debouncedValue);
      setSearchResult(searchResult);
      setLoading(false);
    };

    if (!debouncedValue) {
      setSearchResult([]);
      return;
    }
    fetchApiSearchUser();
  }, [debouncedValue]);

  const handleClearInput = () => {
    setSearchValue('');
    setSearchResult([]);
    inputSearchRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChangeInputSearch = (e) => {
    if (!e.target.value.startsWith(' ')) {
      setSearchValue(e.target.value);
    }
  };

  return (
    <>
      <HeadlessTippy
        interactive
        appendTo={document.body}
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
            onChange={(e) => handleChangeInputSearch(e)}
            placeholder="Search accounts and videos"
          />

          <div className={cx('block-loading-clear')}>
            {searchValue && loading === false && (
              <button className={cx('clear')} onClick={() => handleClearInput()}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}

            {loading === true && <LoadingIcon className={cx('loading')} />}
          </div>

          <span className={cx('splitter')}></span>

          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </>
  );
}

export default Search;
