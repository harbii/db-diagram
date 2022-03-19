import { QItem  , QItemSection , QIcon } from 'quasar'
import { Vue    , Component    , Prop  } from 'vue-property-decorator'
import { Column                        } from 'src/models'

@Component export default class extends Vue {
    @Prop({ type : Column , required : true }) readonly value !: Column ;
    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( QItem , { class : `bg-${ this.value.Arguments.Color }` , props : { bordered : true , separator : true } } , [
            CreateElement( QItemSection , { props : { avatar : true } } , [
                this.value.Arguments.Icon ? CreateElement( QIcon , { props : { name : this.value.Arguments.Icon } } ) : null
            ] ) ,
            CreateElement( QItemSection , this.value.Title.Name + '' ) ,
            CreateElement( QItemSection , { props : { side : true } } , this.value.Total + '' ) ,
            // CreateElement( QItemSection , { props : { side : true } } , this.value.increment ) ,
        ] )
    }
};
