import { Vue    , Component    , Prop   } from 'vue-property-decorator'
import { QItem  , QItemSection , QBadge } from 'quasar'
import { Column                         } from 'src/models'

@Component export default class extends Vue {
    @Prop({ type : Column , required : true }) value !: Column ;
    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( QItem , { } , [
            CreateElement( QItemSection , this.value.name ) ,
            CreateElement( QItemSection , { props : { side : true } } , this.value.type      ) ,
            CreateElement( QItemSection , { props : { side : true , top : true } } , [ CreateElement( QBadge , { props : { label : this.value.Null , color : 'teal' } } ) ] ) ,
            // CreateElement( QItemSection , { props : { side : true } } , this.value.increment ) ,
        ] )
    }
};