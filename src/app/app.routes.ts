import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
export const routes: Routes = [
    {
        path: 'header',
        component: HeaderComponent,
    },
    {
        path: 'map',
        component: MapComponent,
    },
    { path: '', redirectTo: '/map', pathMatch: 'full'},
];

