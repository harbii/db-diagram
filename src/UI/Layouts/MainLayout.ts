import { Vue           , Component } from 'vue-property-decorator'
import   Editorprism                 from 'Components/Editorprism'
import   Resize                      from 'Components/Resize.vue'

import {
    QLayout       , QHeader        ,
    QToolbarTitle , QFile          ,
    QDrawer       , QPageContainer ,
    QBtn          , QToolbar
} from 'quasar'

@Component([
    QLayout     , Editorprism    ,
    QHeader     , QToolbarTitle  ,
    QFile       , QPageContainer ,
    QDrawer     , Resize         ,
    QBtn        , QToolbar
])

export default class MainLayout extends Vue {
    drawerWidth    : number = 200 ;
    originalWidth  : number = 200 ;
    originalleft   : number = 0   ;
    code           : string | ArrayBuffer = ''  ;
    language       : string = 'javascript'  ;
    handlePan            ({ evt : { } , ...newInfo }) {
        if ( newInfo.isFirst ) {
            this.originalWidth = this.drawerWidth     ;
            this.originalleft = newInfo.position.left ;
        } else this.drawerWidth = Math.max( 200 , Math.min( 1400 , this.originalWidth + ( newInfo.position.left - this.originalleft ) ) )
    }
    readFileAsync        ( file : File ) : Promise< string | ArrayBuffer > {
        return new Promise( ( resolve , reject ) => {
            let reader     = new FileReader( );
            reader.onload  = ( ) => resolve( reader.result || '' ) ;
            reader.onerror = reject ;
            reader.readAsText( file , "UTF-8" );
        })
    }
    async uploudJsonFile ( file : File ){
        this.code = await this.readFileAsync( file );
    }
    render               ( CreateElement : Vue.CreateElement ) : Vue.VNode {
        let file : Vue.VNode<QFile> ;
        return CreateElement( QLayout , { class : 'hHh lpR fFf' } , [ 
            CreateElement( QHeader , { props : { elevated : true } } , [ CreateElement( QToolbar , { props : { elevated : true } } , [
                CreateElement( QToolbarTitle , 'diagram test' ) ,
                file = CreateElement( QFile , { style : 'display:none' , on : { input : this.uploudJsonFile } } ) ,
                CreateElement( QBtn , { props : { dense : true , flat : true , icon : "fas fa-upload" } , on : { click ( ) { file.componentInstance.pickFiles( ) } } } ) ,
            ] ) ] ) ,
            CreateElement( QDrawer , { class : 'bg-grey-3' , props : { 'show-if-above' : true , bordered : true , width : this.drawerWidth , breakpoint : 500 } } , [
                CreateElement( Resize , { props : { handlePan : this.handlePan } }) ,
                CreateElement( Editorprism , { props : { value : this.code } , on : { input : ( code : string )  => this.code = code } }) ,
            ] ) ,
            CreateElement( QPageContainer , { props : { elevated : true } } , [
                CreateElement( 'router-view' , { props : { value : this.code , language : this.language } } ) ,
            ] ) ,
        ] )
    }
}