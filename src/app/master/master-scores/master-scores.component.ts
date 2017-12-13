import {Component, OnInit} from '@angular/core';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";


const TEAM_LIST = gql`
    query Teams {
        teams {
            id
            name
            points
            state
            avatarUrl
        }
    }
`;

@Component({
    selector: 'app-master-scores',
    templateUrl: './master-scores.component.html',
    styleUrls: ['./master-scores.component.css']
})
export class MasterScoresComponent implements OnInit {

    private teams: any;
    private buzzedTeam: any;

    constructor(private apollo: Apollo) {
    }

    ngOnInit() {
        this.apollo
            .watchQuery<any>({
                query: TEAM_LIST,
                fetchPolicy: "cache-and-network"
            })
            .valueChanges
            .subscribe(({data}) => {
                if (data) {
                    this.teams = data.teams;
                    this.buzzedTeam = this.teams.filter(team => "BUZZED" === team.state);
                    console.log(this.buzzedTeam);
                }
            });
    }

}
