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
import { PlayerPlayComponent } from './player/player-play/player-play.component';
import {WebSocketLink} from "apollo-link-ws";
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';

@NgModule({
    declarations: [
        AppComponent,
        DashbordContainerComponent,
        MasterContainerComponent,
        MasterScoresComponent,
        PlayerContainerComponent,
        PlayerChooseComponent,
        PlayerCreateComponent,
        PlayerPlayComponent,
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

        const http = httpLink.create({uri: '/graphql'});
        const ws = new WebSocketLink({uri: 'ws://' + window.location.host + '/subscription', options: { reconnect: true }});

        const link = split(({ query }) => {
                const { kind, operation } = getMainDefinition(query);
                return kind === 'OperationDefinition' && operation === 'subscription';
            },
            ws,
            http,
        );

        apollo.create({link: link, cache: new InMemoryCache()})
    }
}
