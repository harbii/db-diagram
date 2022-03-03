<style>
    /* required class */
    .my-editor {
        /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
        background: #2d2d2d;
        color: #ccc;

        /* you must provide font-family font-size line-height. Example: */
        font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
        font-size: 14px;
        line-height: 1.5;
        padding: 5px;
    }

    /* optional class for removing the outline */
    .prism-editor__textarea:focus {
        outline: none;
    }
</style>

<script lang="ts">
import { Vue, Component, Prop , Watch } from 'vue-property-decorator'
import { CreateElement, VNode         } from 'vue'
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

@Component({ components: { PrismEditor } })
export default class extends Vue {
    @Prop({ type : String , required : true         } ) readonly value    ! : string ;
    @Prop({ type : String , default  : 'javascript' } )          language ! : string ;
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
    render( CreateElement : CreateElement ) : VNode {
        return CreateElement( PrismEditor , { class : 'fit' , props : {
            'line-numbers'         : true             ,
            'autoStyleLineNumbers' : true             ,
            tabSize                : 4                ,
            language               : this.language    ,
            value                  : this.code        ,
            highlight              : ( value : string ) => highlight( value , languages.javascript ) ,
        } , on : { input : ( code : string )  => this.$emit( 'input' , this.code = code ) } } )
    }
}; </script>
