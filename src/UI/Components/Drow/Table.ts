import { Column                                } from '.'
import { Vue   , Component ,  Prop             } from 'vue-property-decorator'
import { Table , Column    as ColumnModel      } from 'src/models'
import { QList , QIcon ,  QItem , QItemSection } from 'quasar'

@Component export default class extends Vue {

    @Prop({ type : Table , required : true }) readonly value !: Table ;

    renderQList( CreateElement : Vue.CreateElement ){
        return this.value.Columns.map( ( columnModel : ColumnModel ) => CreateElement( Column , { props : { value : columnModel } } ) ) ;
    }

    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( QList , { class : 'col-4' , props : { bordered : true , separator : true } } , [
            CreateElement( QItem , { class : `bg-${ this.value.Arguments.Color }` } , [
                CreateElement( QItemSection , { props : { avatar : true } } , [
                    this.value.Arguments.Group ? this.value.Arguments.Group.toUpperCase( ) : null
                ] ) ,
                CreateElement( QItemSection , { class : 'text-center' } , this.value.Label ) ,
                CreateElement( QItemSection , { props : { avatar : true } } , [
                    CreateElement( QIcon , { props : { name : this.value.Arguments.Icon } } )
                ] ) ,
            ] ) ,
            this.renderQList( CreateElement ) ,
        ] )
    }

}