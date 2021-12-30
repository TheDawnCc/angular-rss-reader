import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-rss-reader';
  model = new Feed();
  addFeed() {
    console.log(this.model.title);
    console.log(this.model.Url)

    $('#toggleInputArea').toggle(false);
  }
}

export class Feed{
  title:any;
  Url:any;
}