export interface IArguments {
    [ key : string ] : String
}

export interface IColumn {
    Name      : String
    Arguments : IArguments
}

export interface ITable extends IColumn {
    Columns   : IColumn[ ]
}

export class RegExpConstants{
    static readonly commentsRegex : RegExp = /\/\*[\s\S]*?\*\/|\/\/.*/g ;
    static readonly spacesRegex   : RegExp = /\s\s|\n+/g                ;
    static readonly newLine       : RegExp = /\n/                       ;
    static readonly blocks        : RegExp = /{(.*)}/                   ;
    static readonly firstWord     : RegExp = /(?:^|(?:[.!?]\s))(\w+)/   ;
    static readonly args          : RegExp = /\(\s*[^\[\]]*?\s*\)/g     ; /// ==== \\(\\s*[^\\[\\]]*?\\s*\\)/g
    convert( args : RegExp ){
        return /\/(.*)\/(.*)/.exec( args.toString( ) ) ;
    }
}

export class Stringer{

    data : String ;

    constructor( data : String ) {
        this.data = data ;
    }

    static setData( data : String ) : Stringer {
        return new Stringer( data ) ;
    }

    getName( ) : String {
        return this.match( RegExpConstants.firstWord ) ;
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

export default class Preser{

    static Tables( data : String ) : ITable[ ] { return data
        .replace ( RegExpConstants.commentsRegex , ''    )
        .replace ( RegExpConstants.spacesRegex   , ' '   )
        .replace ( /}/gi                         , '}\n' )
        .split   ( RegExpConstants.newLine               )
        .filter  ( n => n                                )
        .map     ( n => n.trim( )                        )
        .map     ( ( data : String ) : ITable => ( {
            Name      : Stringer .setData ( data ).getName      (           ) ,
            Arguments : Stringer .setData ( data ).GetArguments ( '(' , ')' ) ,
            Columns   : Preser   .Columns ( data )
        } ) )
    ; }

    static Columns( data : String ) : IColumn[ ] { return Stringer
        .setData( data                       )
        .match  ( RegExpConstants.blocks , 1 )
        .split  ( "]"                        )
        .map    ( n => n.trim( )             )
        .filter ( n => n                     )
        .map    ( n => n + ' ]'              )
        .map    ( ( data : String ) : IColumn => ({
                Name      : Stringer.setData( data ).getName      (           ) ,
                Arguments : Stringer.setData( data ).GetArguments ( '[' , ']' ) ,
            }) )
        ;
    }

}