import { Vue   , Component, Prop } from 'vue-property-decorator'
import   Table                     from './Drow/Tables'
import   preser                    from '../../services/parser'

@Component export default class extends Vue {

    @Prop({ type : String , required : true } ) value ! : string;

    code : string[ ] = preser.fix( this.value ).resulte( ) ;

    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( 'div' , { class : 'fit row' } , this.code.map( ( string : String ) => CreateElement( Table , { props : { value : string } } ) ) );
    }

};