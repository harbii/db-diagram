import { Table , Column , Args }  from 'app/src/models'

export default class Preser{
    data          : string ;
    commentsRegex : RegExp = /\/\*[\s\S]*?\*\/|\/\/.*/g ;
    spacesRegex   : RegExp = /\s\s|\n+/g ;
    static expr   : string = `translates ( ) {
        value [ Null : false , type : Varchar ]
    }
    sc as sss {
        value [ Null : false , type : Varchar ]
    }
    sc as sss {
        id           [ type : SERIAL    ]
        value        [ type : mixed    , default : '' ]
        is_available [ type : Boolean  , default : true ]
        created_at   [ type : DateTime , default : now( ) ]
    }
    mahmoud {
        value        [ Null : false    , type      : Varchar              ]
        languge_id   [ type : bigint   , ref       : > L.id, Null : false ]
        creator_id   [ type : Integer  , Null      : false                ]
        creator_type [ type : Varchar  , Null      : false                ]
        about_type   [ type : Varchar  , Null      : true                 ]
        about_id     [ type : Integer  , Null      : false                ]
        id           [ type : SERIAL   , increment : true                 ]
        is_available [ type : Boolean  , default   : true                 ]
        is_active    [ type : Boolean  , default   : true                 ]
        created_at   [ type : DateTime , default   : now( )               ]
        updated_at   [ type : DateTime , default   : now( )               ]
        delete_at    []
    }
    ca ( color : green ) {
        value [ Null : false , type : Varchar ]
        delete_at
    }`;

    constructor( data : string ) {
        this.data = data ;
    }

    getStringBetween ( start : String , end : String ) : RegExpMatchArray | String {
        return String( this.data ).match( new RegExp( start + "(.*)" + end ) ) ?? '' ;
    }

    stringReBuild( ) : string[ ] {
        return this.data
            .replace ( this.commentsRegex , ''    )
            .replace ( this.spacesRegex   , ' '   )
            .replace ( /}/gi              , '}\n' )
            .split   ( '\n'                       )
            .filter  ( n => n                     )
            .map     ( n => n.trim( )             )
        ;
    }

    Tables( ) : Table[ ] {
        return this
            .stringReBuild ( )
            .map( ( table : string ) => new Table( table ) )
        ;
    }

    static fix( data : string ) : Preser {
        return new Preser( data ) ;
    }

    static GetTableNameFromString( Contant : string ) : string {
        return ( new Preser( Contant ) ).getStringBetween( 'table ' , ' {' )[ 1 ];
    }

    static GetColumnNameFromString( Contant : string ) : string {
        return Contant.replace( / .*/ , '' ) ;
    }

    static convertStringTocolumn( Contant : string ) : Column[ ] {
        return ( new Preser( Contant ) ).convertStringToContant( Contant ) ;
    }

    convertStringToContant( Contant : string ) : Column[ ] {
        return ( new Preser( Contant ) ).getStringBetween( '{ ' , ' }' )[ 1 ]
            .split  ( "]"    )
            .filter ( n => n )
            .map    ( n => n.trim( ) + ' ]' )
            .map( ( column : string ) => new Column ( column ) )
        ;
    }

    static GetColumndetails( Contant : string ) : Args {
        let object : Args = new Args( ) ;
        ( Contant.match( /\[\s*[^\[\]]*?\s*\]/g ) ?? [ '' ] )[ 0 ]
            .slice ( 1 , -1 )
            .split ( ","    )
            .map( arg => {
                let argd = arg.split( ":" ) ;
                if ( argd.length === 1 ) argd = [ '' , '' ] ;
                object[ argd[ 0 ].trim( ) ] = argd[ 1 ].trim( ) ;
            } )
        ;
        return object ;
    }

    static GetTableDetailsFromString( Contant : string ) : Args {
        let object : Args = new Args( ) ;
        ( Contant.match( /\(\s*[^\[\]]*?\s*\)/g ) ?? [ '' ] )[ 0 ]
            .slice ( 1 , -1 )
            .split ( ","    )
            .map( arg => {
                let argd = arg.split( ":" ) ;
                if ( argd.length === 1 ) argd = [ '' , '' ] ;
                object[ argd[ 0 ].trim( ) ] = argd[ 1 ].trim( ) ;
            } )
        ;
        return object ;
    }

}