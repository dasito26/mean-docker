import { Routes } from '@angular/router';
import { LayoutComponent } from '../../@core/layout/public/layout.component';
import { HomeComponent } from './home.component';

export default [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            }
        ],
    }
] as Routes;
