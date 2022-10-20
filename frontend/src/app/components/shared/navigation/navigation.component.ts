import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'aquana-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @ViewChild('nav') nav: any;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}

  toggleNav() {
    this.nav.nativeElement.classList.toggle('open');
  }
}
