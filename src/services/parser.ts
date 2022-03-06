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

export default class preser{
    data          : string ;
    commentsRegex : RegExp = /\/\*[\s\S]*?\*\/|\/\/.*/g ;
    spacesRegex   : RegExp = /\s\s+/g ;
    expr = `Table translates ( ) {
        value Varchar [ not null ]
    }
    Table sc as sss {
        value Varchar [ not null ]
    }
    Table translates {
        value Varchar [ not null ]
        languge_id bigint [ ref: > L.id, not null ]
        creator_id Integer [ not null ]
        creator_type Varchar [ not null ]
        about_id Integer [ not null ]
        about_type Varchar [ not null ]
        id SERIAL [ increment ]
        is_available Boolean [ default: true ]
        is_active Boolean [ default: true ]
        created_at DateTime [ default: 'now( )' ]
        updated_at DateTime [ default: 'now( )' ]
        delete_at DateTime [ null ]
    }
    Table ca ( ) {
        value Varchar [ not null ]
    }`;
    static fix( data : string ) : preser {
        return new preser( data ) ;
    }
    constructor( data : string ) {
        this.data = this.expr ;
    }
    stringReBuild( string : string ) : string[ ] {
        return string
            .replace ( this.commentsRegex , ''        )
            .replace ( this.spacesRegex   , ' '       )
            .replace ( /table|Table/gi    , '\ntable' )
            .split   (                      '\n'      )
            .filter  ( n => n )
        ;
    }
    resulte( ) : string[ ] {
        return this.stringReBuild ( this.data ) ;
    }
}