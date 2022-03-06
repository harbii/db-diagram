import { Vue, Component, Prop } from 'vue-property-decorator'
import Table from './Drow/Tables'
import preser from '../../services/parser';

@Component({ Table })

export default class DataBaseTableUi extends Vue {
    @Prop({ type : String , required : true } ) value ! : string;
    name : string = 'DataBaseTableUi' ;
    get code( ) : string[ ] {
        return preser.fix( this.value ).resulte( ) ;
    }
    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( 'div' , this.code.map( ( string : String ) => CreateElement( Table , { props : { value : string } } ) ) );
    }
};