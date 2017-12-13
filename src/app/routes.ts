import { Routes } from '@angular/router';

import {DashbordContainerComponent} from "./dashboard/dashbord-container/dashbord-container.component";
import {MasterContainerComponent} from "./master/mater-container/mater-container.component";
import {MasterScoresComponent} from "./master/master-scores/master-scores.component";

export const routes: Routes = [
    {
        path: '',
        component: DashbordContainerComponent
    },
    {
        path: 'master',
        component: MasterContainerComponent,
        children: [
            {
                path: '',
                component: MasterScoresComponent,
            }
        ]
    }
];
