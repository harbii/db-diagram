import { Column                         } from '.'
import { Vue    , Component , Prop      } from 'vue-property-decorator'
import { Table  , Column as ColumnModel } from 'src/models'
import { QCard  , QList , QCardSection , QIcon , QItem , QItemSection } from 'quasar'

@Component export default class extends Vue {

    @Prop({ type : Table , required : true }) readonly value !: Table ;

    renderQList( CreateElement : Vue.CreateElement ){
        return this.value.Columns.map( ( columnModel : ColumnModel ) => CreateElement( Column , { props : { value : columnModel } } ) ) ;
    }

    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( QList , { class : 'col-4' , props : { bordered : true , separator : true } } , [
            CreateElement( QItem , { class : `bg-${ this.value.Arguments.color }` } , [
                CreateElement( QItemSection , this.value.Name + '' ) ,
                CreateElement( QItemSection , { props : { avatar : true } } , [
                    CreateElement( QIcon , { props : { name : this.value.Arguments.icon } } )
                ] ) ,
            ] ) ,
            this.renderQList( CreateElement ) ,
        ] )
    }

}