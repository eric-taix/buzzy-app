import { Routes } from '@angular/router';

import {DashbordContainerComponent} from "./dashboard/dashbord-container/dashbord-container.component";
import {MasterContainerComponent} from "./master/mater-container/mater-container.component";
import {MasterScoresComponent} from "./master/master-scores/master-scores.component";
import {PlayerContainerComponent} from "./player/player-container/player-container.component";
import {PlayerChooseComponent} from "./player/player-choose/player-choose.component";
import {PlayerCreateComponent} from "./player/player-create/player-create.component";
import {PlayerPlayComponent} from "./player/player-play/player-play.component";

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
    },
    {
        path: 'player',
        component: PlayerContainerComponent,
        children: [
            {
                path: '',
                component: PlayerChooseComponent
            },
            {
                path: 'create',
                component: PlayerCreateComponent
            }
        ]
    },
    {
        path: 'play/:teamId',
        component: PlayerPlayComponent
    }
];
