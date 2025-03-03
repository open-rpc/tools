import { ErrorObject } from '@open-rpc/meta-schema';
import { isEqual } from 'lodash';

export const mergeErrors = (
  errors?: ErrorObject[],
  errorGroups?: ErrorObject[][]
): ErrorObject[] => {
  const errorGroupsErrors = errorGroups ? errorGroups.flat() : [];
  const mergedErrors = [...(errors || []), ...errorGroupsErrors];
  const uniqueErrors = mergedErrors.filter(
    (error, index, self) => index === self.findIndex((t) => isEqual(t, error))
  );
  return uniqueErrors;
};
