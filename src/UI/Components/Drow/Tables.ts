import { Vue, Component, Prop } from 'vue-property-decorator'

class table{
    data : string ;
    constructor( data : string ) {
        this.data = data ;
    }
    toString( ){
        console.log( 'this.data' , this.data ) ;
        console.log( 'this.tableName' , this.tableName || '' ) ;
        return this.data
    }
    get tableName( ) : string{
        return this.data.getStringBetween( 'table ' , ' {') ;
    }
    get contant( ) : string{
        return this.data.getStringBetween( 'table ' , ' {') ;
    }
}

@Component
export default class DataBaseTableUi extends Vue {
    @Prop({ type : String , required : true } ) value ! : string;
    name : string = 'DataBaseTableUi' ;
    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( 'div' , ( new table( this.value ) ).toString( ) )
    }
};