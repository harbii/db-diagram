import { IArguments } from "./Interfaces"

export default class Args implements IArguments {
    [ key     : string ] : String ;
    type      : String = 'mixed' ;
    Null      : String = 'false' ;
    increment : String = 'false' ;
    color     : String = ''      ;
    icon      : String = ''      ;
    default   : String = ''      ;
    constructor( args : IArguments ) {
        this.type      = args.type      || 'mixed' ;
        this.Null      = args.Null      || 'false' ;
        this.increment = args.increment || 'false' ;
        this.color     = args.color     || ''      ;
        this.icon      = args.icon      || ''      ;
        this.default   = args.default   || ''      ;
    }
}