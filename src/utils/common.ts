import { ListParams } from "../models";

export function getListParamsFromLocation(
  query: string[]
): ListParams | undefined {
  if (!query || query.length <= 0) return undefined;
  let ret: ListParams = {};
  for (let i = 0; i < query.length; i++) {
    if (query[i].includes("_page")) {
      ret = { ...ret, _page: parseInt(query[i].split("=")[1]) };
    }
  }
  return ret;
}
export const captializeString = (input: string) => {
  if (!input) return "";
  return `${input[0].toUpperCase()}${input.slice(1)}`;
};
export const formatCellByMark = (mark: number) => {
  if (mark >= 8) return "#ADE1D1";
  else if (mark >= 4) return "#ECF3BF";
  return "#F28EA6";
};
