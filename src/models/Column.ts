import { Args    } from "."
import { IColumn } from "./Interfaces"

export default class Column{
    Name      : String ;
    Arguments : Args   ;
    constructor( data : IColumn ) {
        this.Name      = data.Name ;
        this.Arguments = new Args( data.Arguments ) ;
    }

    get Null( ) : String {
        return this.Arguments.Null === 'true' ? '?' : '!' ;
    }

    get increment( ) : String {
        return this.Arguments.increment === 'true' ? 'increment' : 'not increment' ;
    }

    get default( ) : String {
        return this.Arguments.default ? ' = ' + this.Arguments.default : ''  ;
    }

    get total( ) : String {
        return `${ this.Arguments.Null } ${ this.Arguments.type } ${ this.default }` ;
    }

}
