import { Vue, Component, Prop , Watch } from 'vue-property-decorator'
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

@Component({ components: { PrismEditor } })

export default class Editorprism extends Vue {

    @Prop({ type : String , required : true         })
    readonly value    ! : string ;

    @Prop({ type : String , default  : 'javascript' })
    readonly language ! : string ;

    code : String = this.value ;

    constructor( ) {
        super( );
        this.language = 'javascript' ;
    }

    highlighter ( value : string ) {
        return highlight( value , languages.javascript ) // languages.<insert language> to return html with markup
    }

    @Watch( 'value' )onPropertyChanged( value: string , oldValue: string)  {
        this.code = value ;
    }
    render( CreateElement : Vue.CreateElement ) : Vue.VNode {
        return CreateElement( PrismEditor , { class : 'fit my-editor' , props : {
            'line-numbers'         : true             ,
            'autoStyleLineNumbers' : true             ,
            tabSize                : 4                ,
            language               : this.language    ,
            value                  : this.code        ,
            highlight              : ( value : string ) => highlight( value , languages.javascript ) ,
        } , on : { input : ( code : string )  => this.$emit( 'input' , this.code = code ) } } )
    }
};