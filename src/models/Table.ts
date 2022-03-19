import { Args    , Column          } from "."
import { IColumn , ITable , ITitle } from "./Interfaces"

export default class Table implements ITable {

    Title     : ITitle    ;
    Arguments : Args      ;
    Columns   : Column[ ] ;

    constructor( data : ITable ) {
        this.Title     = data.Title ;
        this.Arguments = new Args( data.Arguments ) ;
        this.Columns   = data.Columns.map( ( column : IColumn ) => new Column ( column ) ) ;
        console.log( 'Title'   , data.Title         ) ;
        console.log( 'Name'    , data.Title.Name    ) ;
        console.log( 'Type'    , data.Title.Type    ) ;
        console.log( 'Extends' , data.Title.Extends ) ;
        console.log( 'Group'   , data.Title.Group   ) ;
    }

    get Label( ) : string {
        return `${ this.Arguments.Label || this.Title.Name } ${ this.Arguments.As ? ' ~ ' + this.Arguments.As : '' }`
    }

}