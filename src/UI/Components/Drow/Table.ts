import { Vue    , Component , Prop      } from 'vue-property-decorator'
import { QCard  , QList , QCardSection  } from 'quasar'
import { Table  , Column as ColumnModel } from 'src/models'
import { Column                         } from '.'

@Component export default class extends Vue {

    @Prop({ type : Table , required : true } ) value ! : Table ;

    renderQList( CreateElement : Vue.CreateElement ){
        return CreateElement( QList , {
            props : { bordered : true , separator : true }
        } , this.value.contant.map( ( columnModel : ColumnModel ) => CreateElement( Column , { props : { value : columnModel } } ) ) ) ;
    }

    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( QCard , { class : 'col-4' } , [
            CreateElement( QCardSection , { class : 'bg-' + this.value.color} , this.value.tableName ) ,
            this.renderQList( CreateElement ) ,
        ] )
    }

}