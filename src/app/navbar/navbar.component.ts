import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private quizService:SharedService) { }

  ngOnInit(): void {
  }
  SignOut() {
    localStorage.clear();
    clearInterval(this.quizService.timer);
    this.router.navigate(['/register']);
  }

}
