import { APP_BOOTSTRAP_LISTENER, Component } from '@angular/core';
import { Feed } from './models/feeds';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-rss-reader';
  feed = new Feed();
  feedList: Array<Feed> = [];

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit() {
    this.feedList = this.feedService.getFeeds();
  }

  addFeedUrl() {
    this.feedService.addFeed(this.feed);
    console.log(this.feed);
    this.feed = new Feed();
    (<any>$('#toggleInputArea')).collapse('toggle');
    this.feedList = this.feedService.getFeeds();
    console.log(this.feedList);
  }
}