<template>
    <q-page class="row items-center justify-evenly">
        <Prism v-model ="value" />
    </q-page>
</template>

<script lang="ts">
    import { Vue , Component , Prop } from 'vue-property-decorator'     ;
    import   Prism                    from 'Components/prism.vue'       ;
    @Component({ components: { Prism } })
    export default class extends Vue {
        @Prop({ type : String , required : true } ) value ! : string;
    };
</script>
