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

  addFeed(item: Feed):boolean {
    if(feeds.find(t=>t.Url==item.Url)){
      return false;
    }
    feeds.push(item);
    this.getFeedData();
    return true;
  }

  removeFeed(item: Feed) {
    const index = feeds.indexOf(item,0);
    if (index > -1) {
      feeds.splice(index, 1);
    }
  }

  getFeeds(): Feed[] {
    return feeds;
  }

  getFeedData() {
    // const _url = "https://rss.art19.com/apology-line";
    // const _url = "https://feeds.simplecast.com/54nAGcIl";
    // const _url = "https://feeds.simplecast.com/qm_9xx0g";
    // const _url = "https://feeds.megaphone.fm/WWO3519750118";
    // const _url = "https://gadgets.ndtv.com/rss/feeds";

    this.NewsDatabase = new NewsData();

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
          this.RssData = result;
          this.NewsDatabase.News.push(this.RssData);
        });
      });
    }

    return this.NewsDatabase;
  }
}
