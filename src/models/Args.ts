import { IArguments } from "./Interfaces"

export default class Args implements IArguments {
    [ key     : string ] : String ;
    Type      : String = 'mixed' ;
    Null      : String = 'false' ;
    Increment : String = 'false' ;
    Color     : String = ''      ;
    Icon      : String = ''      ;
    Default   : String = ''      ;
    Lable     : String = ''      ;
    As        : String = ''      ;
    constructor( args : IArguments ) {
        Object.keys( args ).map( key => this[ Args.capitalizeFirstLetter( key ) ] = args[ key ] ) ;
    }
    static capitalizeFirstLetter( string : string ) {
        return string.charAt( 0 ).toUpperCase( ) + string.slice( 1 ).toLowerCase( );
    }

}