import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
    {
        path : '/' , component : ( ) => import( 'Layouts/MainLayout.vue' ) , children : [ { path: '', component: () => import( 'Pages/Index.vue' ) } ]
    },
    { path : '*', component : ( ) => import( 'Pages/Error404.vue' ) }
];

export default routes;
