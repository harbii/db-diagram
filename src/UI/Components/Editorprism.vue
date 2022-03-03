<template>
    <PrismEditor
        line-numbers
        autoStyleLineNumbers
        :tabSize   ="4"
        class      ="my-editor"
        v-model    ="code"
        @keyup     ="change"
        :highlight ="highlighter"
    />
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    // import Prism Editor
    import { PrismEditor } from 'vue-prism-editor'
    import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

    // import highlighting library (you can use any library you want just return html string)
    import { highlight, languages } from 'prismjs/components/prism-core';
    import 'prismjs/components/prism-clike'
    import 'prismjs/components/prism-javascript'
    import 'prismjs/components/prism-sql'
    import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

    @Component({ components: { PrismEditor } })
    export default class extends Vue {
        @Prop({ type : String , required : true } ) value ! : string ;
        code : String = this.value ;
        highlighter ( value : string ) {
            return highlight( value , languages.sql ) // languages.<insert language> to return html with markup
        }
        change ( ) {
            this.$emit( 'input' , this.code ) ;
        }
    };
</script>

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
