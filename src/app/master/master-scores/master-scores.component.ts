import {Component, OnInit} from '@angular/core';
import gql from "graphql-tag";
import {Apollo, QueryRef} from "apollo-angular";


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

const SUBSCRIBE_TEAM_LIST = gql`
    subscription onTeamsChanged {
        teams {
            id
            name
            points
            state
            avatarUrl
        }
    }
`;


const CORRECT = gql`
    mutation {
        correct { id }
    }    
`;

const WRONG = gql`
    mutation {
        wrong { id }
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

    private teamsQuery: QueryRef<any>;

    private SOUND_CORRECT = new Howl({
        src: ['assets/sound/correct-short.mp3'],
        html5 :true
    });

    private SOUND_WRONG = new Howl({
        src: ['assets/sound/wrong-short.mp3'],
        html5 :true
    });


    constructor(private apollo: Apollo) {
        this.teamsQuery = this.apollo
            .watchQuery<any>({
                query: TEAM_LIST,
                fetchPolicy: "cache-and-network"
            });


        this.teamsQuery.valueChanges
            .subscribe(({data}) => {
                if (data) {
                    this.teams = data.teams;
                    this.buzzedTeam = this.teams.filter(team => "BUZZED" === team.state);
                    if (this.buzzedTeam && this.buzzedTeam.length === 1) {
                        var sound = new Howl({
                            src: ['assets/sound/answer-short.mp3'],
                            html5 :true
                        });
                        sound.play();
                    }
                }
            });

    }

    ngOnInit() {
        this.subscribeToTeamChanges();
    }

    subscribeToTeamChanges() {
        this.teamsQuery.subscribeToMore({
            document: SUBSCRIBE_TEAM_LIST,
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                const teams = subscriptionData.data.teams;
                return Object.assign({}, prev, {
                    teams
                });
            }
        });
    }

    correct() {
        this.SOUND_CORRECT.play();
        this.apollo.mutate({
            mutation: CORRECT
        }).subscribe();
    }

    wrong() {
        this.SOUND_WRONG.play();
        this.apollo.mutate({
            mutation: WRONG
        }).subscribe();
    }

}
