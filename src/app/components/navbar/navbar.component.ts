     import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  today = new Date();
  date = new Date(2021, 1, 21);

  constructor() { }

  ngOnInit(): void {
  }

}
