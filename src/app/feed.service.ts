import { Injectable } from '@angular/core';
import { Feed, feeds } from './models/feeds';
import { ActivatedRoute } from '@angular/router';
import { NewsRss, NewsData } from './models/news-rss';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  RssData: NewsRss | undefined;
  NewsDatabase : NewsData = new NewsData();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  addFeed(item: Feed) {
    feeds.push(item);
    this.getFeedData();
  }

  removeFeed(item: Feed) {
    const index = feeds.indexOf(item);
    if (index > -1) {
      feeds.splice(index, 1);
    }
  }

  getFeeds(): Feed[] {
    return feeds;
  }

  getFeedData() {
    // const _url = "http://blog.sina.com.cn/rss/cng.xml";
    // const _url = "https://seekingalpha.com/api/sa/combined/AAPL.xml";
    // const _url = "https://blogs.windows.com/feed/";
    
    // const _url = "https://gadgets.ndtv.com/rss/feeds";

    const headers = new Headers;
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    const requestOptions: Object = {
      headers: headers,
      observe: 'body',
      responseType: 'text',
    };

    for (let feed of feeds) {
      this.http.get<any>(feed.Url, requestOptions).subscribe((data) => {
        console.log(data);
        let parseString = xml2js.parseString;

        parseString(data, (err, result: NewsRss) => {
          console.log(result);
          console.log(err);
          this.RssData = result;
          this.NewsDatabase.News.push(this.RssData);
        });
      });
    }

    return this.NewsDatabase;
  }
}
