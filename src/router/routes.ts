import { RouteConfig } from 'vue-router'
import MainLayout      from '../UI/Layouts/MainLayout.ts'
import Index           from '../UI/Pages/Index.ts'

const routes: RouteConfig[ ] = [
    {
        path : '/' , component : MainLayout , children : [ { path: '', component: Index } ]
    },
    { path : '*', component : ( ) => import( 'Pages/Error404.vue' ) }
];

export default routes;
