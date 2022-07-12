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
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputSearchRef = useRef();
  const debounced = useDebounce(searchValue, 500);

  // search user
  useEffect(() => {
    if (!debounced) {
      setSearchResult([]);
      return;
    }
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

  const fetchApiSearchUser = async () => {
    setLoading(true);
    const searchResult = await searchService.search(debounced);
    setSearchResult(searchResult);
    setLoading(false);
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

          {searchValue && loading == false && (
            <button className={cx('clear')} onClick={() => handleClearInput()}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading == true && <LoadingIcon className={cx('loading')} />}

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
