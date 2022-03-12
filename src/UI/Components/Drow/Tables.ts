import { Vue   , Component , Prop         } from 'vue-property-decorator'
import { QCard , QList     , QCardSection } from 'quasar'
import Column from './Column'
import Table  from 'src/models/Table'

@Component export default class extends Vue {

    @Prop({ type : String , required : true } ) value ! : string;

    table : Table  = new Table( this.value ) ;

    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( QCard , { class : 'col' } , [
            CreateElement( QCardSection , { class : 'bg-deep-purple-9' } , 'tableName => ' + this.table.tableName ) ,
            CreateElement( QList , { props : {
                bordered  : true ,
                separator : true ,
            } } , this.table.contant.map( ( string : String ) => CreateElement( Column , { props : { value : string } } ) ) ) ,
        ] )
    }

}