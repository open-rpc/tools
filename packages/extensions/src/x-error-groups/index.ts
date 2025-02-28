export interface ErrorObject {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
export type XErrorGroupType = Array<Array<ErrorObject>>;

export { default as XErrorGroupsJSON } from './x-error-groups.json';
