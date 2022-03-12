import Preser from "../services/parser" ;
import { Args , Column } from "."

export default class table{

    data : string ;

    constructor( data : string ) {
        this.data = data ;
        console.log( 'this.details' , this.details );
    }

    get tableName( ) : string {
        return Preser.GetColumnNameFromString( this.data ) ;
    }

    get details( ) : Args {
        return Preser.GetTableDetailsFromString( this.data ) ;
    }

    get contant( ) : Column[ ] {
        return Preser.convertStringTocolumn( this.data ) ;
    }

    get color( ) : string {
        return this.details.color ;
    }

    get icon( ) : string {
        return this.details.icon ;
    }

}