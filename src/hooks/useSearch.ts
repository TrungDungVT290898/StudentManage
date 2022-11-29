import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from './useDebounce';
import useUpdateParams from './useUpdateParams';

function useSearch() {
  const [searchValue, setSearchValue] = useState<string>();
  const { retValue: debounceValue } = useDebounce(searchValue, 1000);
  const [params, setParams] = useSearchParams();
  const [previousSearch, setPreviousSearch] = useState(debounceValue);
  const { updateSearchParam } = useUpdateParams();
  useEffect(() => {
    if (previousSearch === debounceValue) return;
    setPreviousSearch(debounceValue);
    if (debounceValue && debounceValue.length > 0) {
      updateSearchParam(debounceValue);
    } else {
      params.delete('name_like');
      setParams(params);
    }
  }, [debounceValue, params, previousSearch, setParams, updateSearchParam]);

  return { setSearchValue, searchQuery: debounceValue };
}

export default useSearch;
