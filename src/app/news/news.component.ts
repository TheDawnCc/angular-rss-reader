import { Component, OnInit } from '@angular/core';
import { NewsData } from '../models/news-rss';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  NewsDatabase: NewsData = new NewsData();

  constructor(
    private feedService: FeedService,
  ) { }

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe((params: any) => {
    //     var symbol = params.params.q??'AAPL';
    //     this.GetRssFeedData(symbol);
    // });
    this.NewsDatabase = this.feedService.getFeedData();
  }

  refresh():void{
    this.NewsDatabase = this.feedService.getFeedData();
  }
}
