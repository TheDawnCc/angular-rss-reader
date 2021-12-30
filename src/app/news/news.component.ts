import { Component, OnInit } from '@angular/core';
import { NewsRss } from '../models/news-rss';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  RssData: NewsRss | undefined;

  constructor() { }

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe((params: any) => {
    //     var symbol = params.params.q??'AAPL';
    //     this.GetRssFeedData(symbol);
    // });
  }
}
