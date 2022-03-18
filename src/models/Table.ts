import { Args    , Column } from "."
import { IColumn , ITable } from "./Interfaces"

export default class Table{

    Name      : String    ;
    Arguments : Args      ;
    Columns   : Column[ ] ;

    constructor( data : ITable ) {
        this.Name      = data.Name ;
        this.Arguments = new Args( data.Arguments ) ;
        this.Columns   = data.Columns.map( ( column : IColumn ) => new Column ( column ) ) ;
    }

}