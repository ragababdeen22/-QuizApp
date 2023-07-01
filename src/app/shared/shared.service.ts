import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    //---------------- Properties---------------
   // readonly rootUrl = 'https://localhost:7108';
    readonly rootUrl = 'https://localhost:44357';
   //readonly rootUrl = 'http://localhost:2690/';
   
   qns: any[]=[];
   seconds!: number;
   timer: string | number | NodeJS.Timeout | undefined;
   qnProgress: number=0;
   correctAnswerCount: number = 0;

  constructor(private http: HttpClient) { }

    //---------------- Http Methods---------------

    displayTimeElapsed() {
      return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
    }
    getParticipantName() {
      var participant = JSON.parse(localStorage.getItem('participant')?? '{}');
      return participant.Name;
    }
    insertParticipant(name: string, email: string) {
      var body = {
        Name: name,
        Email: email
      }
      return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
    }
    getQuestions() {
      return this.http.get(this.rootUrl + '/api/Questions');
    }
    getAnswers() {
      var body = this.qns.map(x => x.QnID);
      return this.http.post(this.rootUrl + '/api/Answers', body);
    }
    submitScore() {
      var body = JSON.parse(localStorage.getItem('participant')?? '{}');
      body.Score = this.correctAnswerCount;
      body.TimeSpent = this.seconds;
      return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
    }
}
