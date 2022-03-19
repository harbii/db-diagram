import { IColumn , ITable , INode   } from './Interfaces'
import { RegExpConstants , Stringer } from '.'

export default class Preser{

    data   : String           ;
    Tables : INode  [ ] = [ ] ;
    Groups : INode  [ ] = [ ] ;
    Lists  : INode  [ ] = [ ] ;
    Vars   : INode  [ ] = [ ] ;

    constructor( data : String ) {
        this.data = data ;
        let nodes = this.data
            .replace ( RegExpConstants.RegexComments , ''    )
            .replace ( RegExpConstants.RegexSpaces   , ' '   )
            .replace ( /}/gi                         , '}\n' )
            .split   ( RegExpConstants.RegexNewLine          )
            .filter  ( data => data                          )
            .map     ( data => data.trim( )                  )
            .map     ( ( data : String ) : INode => ( {
                Title : Stringer .setData ( data ).getTitleTable ( ) ,
                data : data ,
            } ) )
        ;
        this.Lists  = nodes .filter ( data => data.Title.Type === 'List'  );
        this.Groups = nodes .filter ( data => data.Title.Type === 'Group' );
        this.Vars   = nodes .filter ( data => data.Title.Type === 'Var'   );
        this.Tables = nodes .filter ( data => data.Title.Type === 'Table' );
    }

    static Tables( data : String ) : ITable[ ] {
        let Tables = ( new Preser( data ) ).Tables.map ( ( data ) : ITable => ( {
            Title     : data.Title ,
            Arguments : Stringer .setData ( data.data ).GetArguments ( '(' , ')' ) ,
            Columns   : Preser   .Columns ( data.data )
        } ) );
        // Tables.map( Table => console.log( Table ) ) ;
        return Tables ;
    }

    static Columns( data : String ) : IColumn[ ] { return Stringer
        .setData( data                            )
        .match  ( RegExpConstants.RegexBlocks , 1 )
        .split  ( "]"                             )
        .map    ( n => n.trim( )                  )
        .filter ( n => n                          )
        .map    ( n => n + ' ]'                   )
        .map    ( ( data : String ) : INode => ( {
            Title : Stringer .setData ( data ).getTitleColumn ( ) ,
            data : data ,
        } ) )
        .map    ( ( data : INode ) : IColumn => ({
            Title      : data.Title,
            Arguments : Stringer .setData ( data.data ).GetArguments ( '[' , ']' ) ,
        }) ) ;
    }

}