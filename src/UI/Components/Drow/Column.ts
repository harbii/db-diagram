import { QItem  , QItemSection , QIcon } from 'quasar'
import { Vue    , Component    , Prop  } from 'vue-property-decorator'
import { Column                        } from 'src/models'

@Component export default class extends Vue {
    @Prop({ type : Column , required : true }) readonly value !: Column ;
    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( QItem , { class : `bg-${ this.value.Arguments.color }` , props : { bordered : true , separator : true } } , [
            CreateElement( QItemSection , { props : { avatar : true } } , [
                this.value.Arguments.icon ? CreateElement( QIcon , { props : { name : this.value.Arguments.icon } } ) : null
            ] ) ,
            CreateElement( QItemSection , this.value.Name + '' ) ,
            CreateElement( QItemSection , { props : { side : true } } , this.value.total + '' ) ,
            // CreateElement( QItemSection , { props : { side : true } } , this.value.increment ) ,
        ] )
    }
};
