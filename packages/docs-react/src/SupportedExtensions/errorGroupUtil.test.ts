import { mergeErrors } from './errorGroupUtil';
import { expect, describe, test } from 'vitest';
import { ErrorObject } from '@open-rpc/meta-schema';

describe('errorGroupUtil', () => {
  describe('mergeErrors', () => {
    // Basic test case with simple error objects
    test('should merge errors from both arrays without duplicates', () => {
      const errors: ErrorObject[] = [
        { code: 100, message: 'Error 1' },
        { code: 200, message: 'Error 2' },
      ];

      const errorGroups: ErrorObject[][] = [
        [
          { code: 300, message: 'Error 3' },
          { code: 400, message: 'Error 4' },
        ],
        [{ code: 500, message: 'Error 5' }],
      ];

      const result = mergeErrors(errors, errorGroups);

      expect(result).toHaveLength(5);
      expect(result).toEqual(
        expect.arrayContaining([
          { code: 100, message: 'Error 1' },
          { code: 200, message: 'Error 2' },
          { code: 300, message: 'Error 3' },
          { code: 400, message: 'Error 4' },
          { code: 500, message: 'Error 5' },
        ])
      );
    });

    // Test case for duplicate handling
    test('should remove duplicate errors', () => {
      const errors: ErrorObject[] = [
        { code: 100, message: 'Error 1' },
        { code: 200, message: 'Error 2' },
      ];

      const errorGroups: ErrorObject[][] = [
        [
          { code: 200, message: 'Error 2' }, // Duplicate
          { code: 300, message: 'Error 3' },
        ],
      ];

      const result = mergeErrors(errors, errorGroups);

      expect(result).toHaveLength(3);
      expect(result).toEqual(
        expect.arrayContaining([
          { code: 100, message: 'Error 1' },
          { code: 200, message: 'Error 2' },
          { code: 300, message: 'Error 3' },
        ])
      );
    });

    // Test case for empty arrays
    test('should handle empty arrays', () => {
      const emptyErrors: ErrorObject[] = [];
      const emptyErrorGroups: ErrorObject[][] = [];

      const result = mergeErrors(emptyErrors, emptyErrorGroups);

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    // Test case for null/undefined errorGroups
    test('should handle null/undefined errorGroups', () => {
      const errors: ErrorObject[] = [{ code: 100, message: 'Error 1' }];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result1 = mergeErrors(errors, null as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result2 = mergeErrors(errors, undefined as any);

      expect(result1).toHaveLength(1);
      expect(result1).toEqual(errors);

      expect(result2).toHaveLength(1);
      expect(result2).toEqual(errors);
    });

    // Test case for nested empty arrays
    test('should handle nested empty arrays in errorGroups', () => {
      const errors: ErrorObject[] = [{ code: 100, message: 'Error 1' }];

      const errorGroups: ErrorObject[][] = [[], []];

      const result = mergeErrors(errors, errorGroups);

      expect(result).toHaveLength(1);
      expect(result).toEqual(errors);
    });

    // Test case for complex error objects
    test('should correctly compare complex error objects', () => {
      const complexError1: ErrorObject = {
        code: 100,
        message: 'Complex Error',
        data: {
          details: {
            field: 'username',
            reason: 'too short',
          },
          timestamp: '2023-01-01',
        },
      };

      const complexError2: ErrorObject = {
        code: 100,
        message: 'Complex Error',
        data: {
          details: {
            field: 'username',
            reason: 'too short',
          },
          timestamp: '2023-01-01',
        },
      };

      const errors: ErrorObject[] = [complexError1];
      const errorGroups: ErrorObject[][] = [[complexError2]];

      const result = mergeErrors(errors, errorGroups);

      // Should detect they're the same object structurally
      expect(result).toHaveLength(1);
      expect(result).toEqual([complexError1]);
    });
  });
});
