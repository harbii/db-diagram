<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated> <q-toolbar>
            <q-toolbar-title> diagram test </q-toolbar-title>
            <q-file @input ="uploudJsonFile" style="display: none;" ref="file" label="Standard" />
            <q-btn dense flat icon="fas fa-upload" @click="$refs.file.pickFiles( )" />
        </q-toolbar> </q-header>
        <q-drawer
            show-if-above
            bordered
            :width      ="drawerWidth"
            :breakpoint ="500"
            class       ="bg-grey-3"
        >
          <!-- The trick is here: adding the resize div and applying v-touch-pan on it. -->
            <div style="width: 5px; cursor: col-resize; position: absolute; right: -5px; height: 100%;" class="bg-primary" v-touch-pan.horizontal.prevent.mouse.preserveCursor="handlePan"  />
            <Editorprism v-model ="code" :language="language" />
        </q-drawer>
        <q-page-container> <router-view v-model ="code" :language="language" /> </q-page-container>
    </q-layout>
</template>

<script lang="ts">
    import { Vue , Component } from 'vue-property-decorator'     ;
    import Editorprism         from 'Components/Editorprism.vue' ;
    @Component({ components : { Editorprism }})
    export default class MainLayout extends Vue {
        drawerWidth    : number = 200 ;
        originalWidth  : number = 200 ;
        originalleft   : number = 0   ;
        code           : string | ArrayBuffer = ''  ;
        language       : string = 'javascript'  ;
        handlePan ({ evt : { } , ...newInfo }) {
            if ( newInfo.isFirst ) {
                this.originalWidth = this.drawerWidth     ;
                this.originalleft = newInfo.position.left ;
            } else this.drawerWidth = Math.max( 200 , Math.min( 1400 , this.originalWidth + ( newInfo.position.left - this.originalleft ) ) )
        }
        readFileAsync( file : File ) : Promise< string | ArrayBuffer > {
            return new Promise( ( resolve , reject ) => {
                let reader     = new FileReader( );
                reader.onload  = ( ) => resolve( reader.result || '' ) ;
                reader.onerror = reject ;
                reader.readAsText( file , "UTF-8" );
            })
        }
        async uploudJsonFile( file : File ){
            this.code = await this.readFileAsync( file );
        }
    }
</script>
