import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Apollo, ApolloModule} from 'apollo-angular';
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {routes} from './routes';
import {DashbordContainerComponent} from './dashboard/dashbord-container/dashbord-container.component';
import {MasterContainerComponent} from './master/mater-container/mater-container.component';
import {MasterScoresComponent} from './master/master-scores/master-scores.component';
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import { PlayerContainerComponent } from './player/player-container/player-container.component';
import { PlayerChooseComponent } from './player/player-choose/player-choose.component';
import { PlayerCreateComponent } from './player/player-create/player-create.component';

@NgModule({
    declarations: [
        AppComponent,
        DashbordContainerComponent,
        MasterContainerComponent,
        MasterScoresComponent,
        PlayerContainerComponent,
        PlayerChooseComponent,
        PlayerCreateComponent,
    ],
    entryComponents: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        ApolloModule,
        HttpClientModule,
        HttpLinkModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {

    constructor(apollo: Apollo, httpLink: HttpLink) {
        apollo.create({
            link: httpLink.create({uri: '/graphql'}),
            cache: new InMemoryCache()
        })
    }
}
