import { Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import {Subject} from "rxjs/Subject";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const CREATE_TEAM = gql`
    mutation CreateTeam($name: String!){
        createTeam(name: $name) {id}
    }
`;


@Component({
    selector: 'app-player-create',
    templateUrl: './player-create.component.html',
    styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent implements OnInit {

    private model: string;
    private modelChanged: Subject<string> = new Subject<string>();
    private avatarUrl: String = "https://robohash.org/default";

    constructor(private apollo: Apollo) {
        this.modelChanged
            .debounceTime(300)
            .subscribe(model => {
                this.avatarUrl = "https://robohash.org/" + (model ? model : "default");
                this.model = model;
            });
    }

    ngOnInit() {
    }

    changed(text: string) {
        this.modelChanged.next(text);
    }

    create() {
        this.apollo
            .mutate({
                mutation: CREATE_TEAM,
                variables: {
                    name: this.model
                }
            })
            .subscribe(({ data }) => {
                console.log('got data', data);
            },(error) => {
                console.log('there was an error sending the query', error);
            });

    }
}
