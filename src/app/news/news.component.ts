import { Component, OnInit } from '@angular/core';
import { NewsData, NewsRss } from '../models/news-rss';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsRss : NewsRss[] = [];

  constructor(
    private feedService: FeedService,
  ) { }

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe((params: any) => {
    //     var symbol = params.params.q??'AAPL';
    //     this.GetRssFeedData(symbol);
    // });
    this.newsRss = this.feedService.getFeedData();
  }

  refresh():void{
    this.newsRss = this.feedService.getFeedData();
    console.log('refresh : '+this.newsRss);
  }
}
