import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  ngOnInit(): void {
    // Pusher.logToConsole = true;

    // var pusher = new Pusher('eaf74954e926bfb7e254', {
    //   cluster: 'eu'
    // });

    // var channel = pusher.subscribe('pixel-battle-channel');
    // channel.bind('paint-pixel', function(data) {
    //   alert(JSON.stringify(data));
    // });
  }
}
