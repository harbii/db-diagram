export default class preser{

    constructor( data : string ){
        this.data = data.replace( this.commentsRegex , '' ) ;
    }
}