import 'prismjs/themes/prism.css'
import Prism                    from 'vue-prismjs'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component([ Prism ])

export default class prism extends Vue {
    @Prop({ type : String , required : true         } ) value    ! : string;
    @Prop({ type : String , default  : 'javascript' } ) language ! : string;
    name : string = 'prism' ;
    get code( ) : string {
        // console.log( 'this.value' , this.value );
        return this.value
    }
    /*
        <prism language="javascript" :plugins="['command-line']" :code="value" />
        <prism language="javascript" :code="code" />
    */
    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( Prism , { class : 'fit' , props : {
            language : this.language ,
            code     : this.code     ,
        } } )
    }
};