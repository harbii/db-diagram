import { boot } from 'quasar/wrappers';

declare global {
    interface String {
        getStringBetween( start : String , end : String ) : RegExpMatchArray | String ;
    }
}

String.prototype.getStringBetween = function ( start : String , end : String ) : RegExpMatchArray | String {
    return String( this ).match( new RegExp( start + "(.*)" + end ) ) ?? '' ;
};

export default boot( ( { Vue } ) => {
} );