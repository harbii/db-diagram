import { Args             } from "."
import { IColumn , ITitle } from "./Interfaces"

export default class Column implements IColumn{
    Title      : ITitle ;
    Arguments : Args   ;
    constructor( data : IColumn ) {
        this.Title     = data.Title ;
        this.Arguments = new Args( { ...data.Arguments , type : data.Title.Type } ) ;
    }

    get Null( ) : String {
        return this.Arguments.Null === 'true' ? '?' : '!' ;
    }

    get increment( ) : String {
        return this.Arguments.Increment === 'true' ? 'increment' : 'not increment' ;
    }

    get Default( ) : String {
        return this.Arguments.Default ? ' = ' + this.Arguments.Default : ''  ;
    }

    get Total( ) : String {
        return `${ this.Null } ${ this.Arguments.Type } ${ this.Default }` ;
    }

}
