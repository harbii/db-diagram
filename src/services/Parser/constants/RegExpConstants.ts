export default class RegExpConstants extends RegExp {
    static readonly RegexComments  : RegExp = /\/\*[\s\S]*?\*\/|\/\/.*/g ;
    static readonly RegexSpaces    : RegExp = /\s\s|\n+/g                ;
    static readonly RegexNewLine   : RegExp = /\n/                       ;
    static readonly RegexTitle     : RegExp = /\(|\{|\[/                 ;
    static readonly RegexBlocks    : RegExp = /{(.*)}/                   ;
    static readonly RegexFirstWord : RegExp = /(?:^|(?:[.!?]\s))(\w+)/   ;
    static readonly args           : RegExp = /\(\s*[^\[\]]*?\s*\)/g     ; /// ==== \\(\\s*[^\\[\\]]*?\\s*\\)/g
    convert( args : RegExp ){
        return /\/(.*)\/(.*)/.exec( args.toString( ) ) ;
    }
}