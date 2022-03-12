import Preser from "../services/parser" ;

export default class table{

    data : string ;

    constructor( data : string ) {
        this.data = data ;
    }

    get tableName( ) : String {
        return Preser.GetTableNameFromString( this.data ) ;
    }

    get contant( ) : String[ ] {
        return Preser.convertStringToContant( this.data ) ;
    }

}