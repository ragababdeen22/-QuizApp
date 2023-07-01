import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  //emailpattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}";
  constructor(private router: Router, public quizService:SharedService) { }

  ngOnInit(): void {
    this.quizService.getAnswers().subscribe(
      (data: any) => {
        this.quizService.correctAnswerCount = 0;
        this.quizService.qns.forEach((e, i) => {
          if (e.answer == data[i])
            this.quizService.correctAnswerCount++;
          e.correct = data[i];
        });
      }
    );
  }
  OnSubmit() {
    this.quizService.submitScore().subscribe(() => {
      this.restart();
    });
  }

  restart() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/quiz']);
  }

}
