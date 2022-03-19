import { ITitle , IArguments } from './Interfaces'
import { RegExpConstants     } from '.'
import { Types               } from './constants'

export default class Stringer{

    data : String ;

    constructor( data : String ) {
        this.data = data ;
    }

    static setData( data : String ) : Stringer {
        return new Stringer( data ) ;
    }

    getExtends( data : String[ ] ) : String[ ] | null {
        let indexOfExtends : number = data.indexOf( '->' ) ;
        let Extends = indexOfExtends !== -1 ? data.slice( indexOfExtends + 1 ) : [ ] ;
        if( Extends.indexOf( '=>' ) !== -1 ) Extends = Extends.slice( 0 , - Extends.indexOf( '=>' ) - 1 );
        return Extends ;
    }

    getGroup( data : String[ ] ) : String[ ] | null {
        let indexOfGroup : number = data.indexOf( '=>' ) ;
        let Group = indexOfGroup !== -1 ? data.slice( indexOfGroup + 1 ) : [ ] ;
        if( Group.indexOf( '->' ) !== -1 ) Group = Group.slice( 0 , - Group.indexOf( '->' ) - 1 );
        return Group ;
    }
    getTitleTable( ) : ITitle {
        let data = this.TitlePreser(  ) ;
        console.log( Types ) ;
        return {
            Name    : ! Types.includes  ( data[ 0 ] ) ? data[ 0 ]                               : 'mixed' ,
            Type    :   Types.includes  ( data[ 0 ] ) ? Types[ data.indexOf( data[ 0 ] + '' ) ] : 'Table' ,
            Extends :   this.getExtends ( data      ) ,
            Group   :   this.getGroup   ( data      ) ,
        } ;
    }

    getTitleColumn( ) : ITitle {
        let data = this.TitlePreser( ) ;
        return {
            Name : data[ 0 ] ,
            Type : data[ 1 ] ,
        } ;
    }

    TitlePreser( ) : String[ ] {
        return this.data.substring( 0 , this.data.search( RegExpConstants.RegexTitle ) ).trim( ).split( /\s+/ ) ;
    }

    match ( matcher: { [ Symbol.match ]( string: string ) : RegExpMatchArray | null ; } , number : number = 0 ) : String {
        return ( this.data.match( matcher ) ?? [ '' ] )[ number ] ;
    }

    GetArguments( start : String = '(' , end : String = ')' , by : string = ',' ) : IArguments {
        let args : IArguments = { } ;
        this.match ( new RegExp( `\\${start}\\s*[^\\[\\]]*?\\s*\\${end}` , 'g' ) )
            .slice ( 1 , -1 )
            .split ( by     )
            .map   ( arg => ( arg.split( ":" ).length === 1 ? [ '' , '' ] : arg.split( ":" ) ).map( key => key.trim( ) ) )
            .map   ( arg => args[ arg[ 0 ] ] = arg[ 1 ] )
        ;
        return args ;
    }

}