import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Apollo, QueryRef} from "apollo-angular";
import gql from "graphql-tag";
import { Howl } from 'howler';

const TEAM_QUERY = gql`
    query Team($teamId: ID!) {
        team(teamId: $teamId) {
            id
            name
            state
            points
            avatarUrl
        }
    }
`

const SUBSCRIBE_TEAM = gql`
    subscription onTeamChanged($teamId: ID!) {
        team(teamId: $teamId) {
            id
            name
            state
            points
            avatarUrl
        }
    }
`;

const BUZZ_TEAM = gql`
    mutation Buzz($teamId: ID!){
        buzz(teamId: $teamId)
    }
`;

@Component({
  selector: 'app-player-play',
  templateUrl: './player-play.component.html',
  styleUrls: ['./player-play.component.css']
})
export class PlayerPlayComponent implements OnInit {

  private teamId: String;
  private teamQuery: QueryRef<any>;
  private team: any;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
      this.teamId = this.route.snapshot.params['teamId'];
      this.teamQuery = this.apollo.watchQuery({
          query: TEAM_QUERY,
          variables: {
              teamId: this.teamId
          }
      });
      this.teamQuery.valueChanges.subscribe(({data}) => {
          this.team = data.team;
      });
  }

  ngOnInit() {
      this.subscribeToTeamChanges();
  }

  subscribeToTeamChanges() {
      this.teamQuery.subscribeToMore({
          document: SUBSCRIBE_TEAM,
          variables: {
              teamId: this.teamId
          },
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) {
                return prev;
            }
            const team = subscriptionData.data.team;
            return Object.assign({}, prev, {
               team
            });
          }
      });
  }

  buzz() {
      if (this.team.state === 'THINKING') {
          var sound = new Howl({
              src: ['assets/sound/answer-short.mp3'],
              html5: true
          });

          sound.play();

          this.apollo
              .mutate({
                  mutation: BUZZ_TEAM,
                  variables: {
                      teamId: this.teamId
                  }
              })
              .subscribe(({data}) => {
              }, (error) => {
                  console.log('there was an error buzzing', error);
              });
      }
  }
}
