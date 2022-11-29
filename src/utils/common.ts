import { ListParams } from '../models';

export function getListParamsFromLocation(query: string[]): ListParams {
  if (!query || query.length <= 0) return { _page: 1, _limit: 15 };
  let ret: ListParams = { _page: 1, _limit: 15 };
  for (let i = 0; i < query.length; i++) {
    const pair = query[i].split('=');
    if (pair[0] === '' || !pair[0]) continue;
    ret = { ...ret, [pair[0]]: pair[1] };
  }
  return ret;
}
export function getSearchStringFromListParams(query: ListParams): string {
  let ret = '';
  for (const x in query) {
    if (x === '') continue;
    ret += `&${x}=${query[x]}`;
  }
  return ret;
}
export const getFilterParamsOnSaga = (filter: ListParams, key: string) => {
  return filter[key]! as string;
};
export const captializeString = (input: string) => {
  if (!input) return '';
  return `${input[0].toUpperCase()}${input.slice(1)}`;
};
export const formatCellByMark = (mark: number) => {
  if (mark >= 8) return '#ADE1D1';
  else if (mark >= 4) return '#ECF3BF';
  return '#F28EA6';
};
