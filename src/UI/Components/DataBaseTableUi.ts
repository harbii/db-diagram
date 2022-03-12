import { Vue   ,  Component  , Prop } from 'vue-property-decorator'
import { Table as TableModels       } from 'app/src/models'
import { Table }                      from './Drow'
import   preser                      from '../../services/parser'

@Component export default class extends Vue {

    @Prop({ type : String , required : true } ) value !: string;

    get code( ) : TableModels[ ] {
        return preser.fix( this.value ).Tables( ) ;
    }

    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( 'div' , { class : 'fit row' } , this.code.map( ( TableModels : TableModels ) => CreateElement( Table , { props : { value : TableModels } } ) ) );
    }

};