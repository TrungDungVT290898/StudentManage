import { useSearchParams } from 'react-router-dom';
import { ListParams } from '../models';

function useUpdateParams() {
  const [params, setParams] = useSearchParams();

  const updatePageParam = (param: string | number) => {
    params.set('_page', param.toString());
    setParams(params);
  };

  const updateSearchParam = (param: string | number) => {
    params.set('name_like', param.toString());
    params.delete('_page');
    setParams(params);
  };
  const updateCustomParams = (listParams: ListParams) => {
    for (const x in listParams) {
      if (!listParams[x]) params.delete(x);
      else params.set(x, listParams[x]);
    }
    setParams(params);
  };
  return { updatePageParam, updateSearchParam, updateCustomParams };
}

export default useUpdateParams;
