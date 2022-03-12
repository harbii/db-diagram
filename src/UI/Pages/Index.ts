import   Prism                     from '../Components/Prism'
import   DataBaseTableUi           from '../Components/DataBaseTableUi'
import { Vue , Component , Prop  } from 'vue-property-decorator'
import { QPage                   } from 'quasar'

@Component([ Prism , DataBaseTableUi , QPage ])

export default class Index extends Vue {
    @Prop({ type : String , required : true } ) value ! : string;
    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( QPage , { class : 'row items-center justify-evenly' } , [
            CreateElement( DataBaseTableUi , { props : { value : this.value } } ) ,
            CreateElement( Prism           , { class : 'fit'       , props : { value : this.value } } ) ,
        ] )
    }
};