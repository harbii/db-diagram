<script lang="ts">
import 'prismjs/themes/prism.css'                             ;
import Prism                    from 'vue-prismjs'            ;
import { Vue, Component, Prop } from 'vue-property-decorator' ;
import { CreateElement, VNode } from 'vue'                    ;
@Component({ components: { Prism } })
export default class extends Vue {
    @Prop({ type : String , required : true         } ) value    ! : string;
    @Prop({ type : String , default  : 'javascript' } ) language ! : string;
    get code( ) : string {
        console.log( 'this.value' , this.value );
        return this.value
    }
    /*
        <prism language="javascript" :plugins="['command-line']" :code="value" />
        <prism language="javascript" :code="code" />
    */
    render( CreateElement : CreateElement ) : VNode {
        return CreateElement( 'prism' , { class : 'fit' , props : {
            language : this.language ,
            code     : this.code     ,
        } } )
    }
};
</script>
