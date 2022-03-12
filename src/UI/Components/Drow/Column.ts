import { Vue, Component, Prop } from 'vue-property-decorator'
import Column from 'src/models/column'
import {
    QItem , QItemSection , QBadge
} from 'quasar'

@Component export default class column extends Vue {

    @Prop({ type : String , required : true }) value ! : string;

    column : Column  = new Column( this.value ) ;

    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( QItem , { } , [
            CreateElement( QItemSection , this.column.name ) ,
            CreateElement( QItemSection , { props : { side : true } } , this.column.type      ) ,
            CreateElement( QItemSection , { props : { side : true , top : true } } , [ CreateElement( QBadge , { props : { label : this.column.Null , color : 'teal' } } ) ] ) ,
            CreateElement( QItemSection , { props : { side : true } } , this.column.increment ) ,
        ] )
    }
};