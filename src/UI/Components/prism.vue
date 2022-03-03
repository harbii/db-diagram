<template>
    <div>
        <!-- <prism language="javascript" :plugins="['command-line']" :code="value" /> -->
        <prism language="sql" :code="code" />
    </div>
</template>

<script lang="ts">
    import 'prismjs/themes/prism.css'                             ;
    import Prism                    from 'vue-prismjs'            ;
    import { Vue, Component, Prop } from 'vue-property-decorator' ;

    @Component({ components: { Prism } })
    export default class extends Vue {
        @Prop({ type : String , required : true } ) value ! : string;
        get code( ) : string {
            console.log( 'this.value' , this.value );
            return this.value
        }
    };
</script>
