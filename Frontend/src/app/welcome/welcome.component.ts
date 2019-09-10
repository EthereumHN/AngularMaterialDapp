import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  navigateTo() {
    window.open('https://metamask.io/');
  }

  navigateToPlayStore() {
    window.open('https://play.google.com/store/apps/details?id=im.status.ethereum');
  }

  navigateToAppStore() {
    window.open('https://apps.apple.com/us/app/coinbase-wallet/id1278383455');
  }
}
