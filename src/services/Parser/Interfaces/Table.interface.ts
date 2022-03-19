import { IColumn } from '.'
export default interface Table extends IColumn {
    Columns : IColumn [ ]
}
