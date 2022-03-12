/** 
 * https://stackoverflow.com/questions/17779744/regular-expression-to-get-a-string-between-parentheses-in-javascript
 * /\(([^)]+)\)/
 * Breakdown:
 * \( : match an opening parentheses
 * ( : begin capturing group
 * [^)]+: match one or more non ) characters
 * ) : end capturing group
 * \) : match closing parentheses
*/

export default class Preser{
    data          : string ;
    commentsRegex : RegExp = /\/\*[\s\S]*?\*\/|\/\/.*/g ;
    spacesRegex   : RegExp = /\s\s+/g ;
    expr                   = `Table translates ( ) {
        value [ Null : false , type : Varchar ]
    }
    Table sc as sss {
        value [ Null : false , type : Varchar ]
    }
    Table mahmoud {
        value        [ Null : false    , type      : Varchar              ]
        languge_id   [ type : bigint   , ref       : > L.id, Null : false ]
        creator_id   [ type : Integer  , Null      : false                ]
        creator_type [ type : Varchar  , Null      : false                ]
        about_type   [ type : Varchar  , Null      : true                 ]
        about_id     [ type : Integer  , Null      : false                ]
        id           [ type : SERIAL   , increment : true                 ]
        is_available [ type : Boolean  , default   : true                 ]
        is_active    [ type : Boolean  , default   : true                 ]
        created_at   [ type : DateTime , default   : 'now( )'             ]
        updated_at   [ type : DateTime , default   : 'now( )'             ]
        delete_at    []
    }
    Table ca ( ) {
        value [ Null : false , type : Varchar ]
    }`;
    constructor( data : string ) {
        this.data = this.expr ;
    }
    stringReBuild( string : string ) : string[ ] {
        return string
            .replace ( this.commentsRegex , ''        )
            .replace ( this.spacesRegex   , ' '       )
            .replace ( /table|Table/gi    , '\ntable' )
            .split   ( '\n'                           )
            .filter  ( n => n                         )
        ;
    }
    resulte( ) : string[ ] {
        return this.stringReBuild ( this.data ) ;
    }

    static fix( data : string ) : Preser {
        return new Preser( data ) ;
    }

    static GetTableNameFromString( Contant : string ) : string {
        return Contant.getStringBetween( 'table ' , ' {' )[ 1 ];
    }

    static GetColumnNameFromString( Contant : string ) : string {
        return Contant.replace( / .*/ , '' ) ;
    }

    static convertStringToContant( Contant : string ) : string[ ] {
        return Contant.getStringBetween( '{ ' , ' }' )[ 1 ]
            .split  ( "]"    )
            .filter ( n => n )
            .map    ( n => n.trim( ) + ' ]' )
        ;
    }

    static GetColumndetails( Contant : string ) : args {
        let object : args = new args( ) ;
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

}

class args {
    [ key : string ] : any   ;
    type      : string  = 'mixed' ;
    Null      : string = 'false'   ;
    increment : string = 'false'   ;
}