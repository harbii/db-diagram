import { Args } from "."
import Preser from "../services/parser" 

export default class Column{

    data : string ;

    constructor( data : string ) {
        this.data = data ;
    }

    get args( ) : Args {
        return Preser.GetColumndetails        ( this.data );
    }

    get name( ) : string {
        return Preser.GetColumnNameFromString ( this.data ) ;
    }

    get type( ) : string {
        return this.args.type ;
    }

    get Null( ) : string {
        return this.args.Null === 'true' ? 'nullable' : 'not nullable' ;
    }

    get increment( ) : string {
        return this.args.increment === 'true' ? 'increment' : 'not increment' ;
    }

}