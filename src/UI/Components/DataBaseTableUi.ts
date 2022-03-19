import { Vue    , Component , Prop } from 'vue-property-decorator'
import { Table  as TableModels     } from 'app/src/models'
import { Table                     } from './Drow'
import preser , { ITable           } from '../../services/Parser'

@Component export default class extends Vue {

    @Prop({ type : String , required : true }) readonly value : string = `` ;

    DrowTable( CreateElement : Vue.CreateElement ) : Vue.VNode[ ] {
        return this.preserValue( ).map( ( table : ITable ) => CreateElement( Table , { props : { value : new TableModels( table ) } } ) );
    }

    preserValue( ) : ITable[ ] {
        return preser.Tables( this.value );
    }

    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( 'div' , { class : 'fit row' } , this.DrowTable( CreateElement ) );
    }

};