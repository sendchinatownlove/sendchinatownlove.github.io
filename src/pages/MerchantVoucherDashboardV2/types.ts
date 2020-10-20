/**
 * Filterable Table Props
 *
 * From the react-filterable-table documentation
 */
export interface FTRenderProps {
  /**
   * The same field object that this render function was passed into.
   * We'll have access to any props on it, including that 'someRandomProp' one we put on there.
   * Those can be functions, too, so we can add custom onClick handlers to our return value.
   */
  field?: any;
  /**
   * The data record for the whole row.
   */
  record?: any;
  /**
   * Value of the field in the data.
   */
  value: any;
}
