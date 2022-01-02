import { APP_BOOTSTRAP_LISTENER, Component, ViewChild } from '@angular/core';
import { Feed } from './models/feeds';
import { FeedService } from './feed.service';
import { NewsComponent } from './news/news.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('newsPage')
  newsPage!: NewsComponent;

  title = 'angular-rss-reader';
  feed = new Feed();
  feedList: Array<Feed> | undefined = [];

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit() {
    this.feedList = this.feedService.getFeeds();
  }

  addFeedUrl() {
    if(this.feedService.addFeed(this.feed)){
      console.log(this.feed);
      this.feed = new Feed();
      (<any>$('#toggleInputArea')).collapse('toggle');
      this.newsPage.refresh();
      // this.feedList = this.feedService.getFeeds();
      console.log(this.feedList);
    }
    else{
      alert('duplicate url');
    }
  }

  removeFeedUrl(url: Feed) {
    console.log('remove url : ' + url.Url);
    this.feedService.removeFeed(url);
    this.newsPage.refresh();
    (<any>$('#rmModal')).modal('hide')
  }
}