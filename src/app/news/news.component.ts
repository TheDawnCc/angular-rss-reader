import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsRss } from './news-rss';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  RssData: NewsRss | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe((params: any) => {
    //     var symbol = params.params.q??'AAPL';
    //     this.GetRssFeedData(symbol);
    // });
    this.getRssFeedData('AAPL');
  }

  getRssFeedData(Symbol: string) {

    console.log('Symbol: ' + Symbol);

    // const _url = "http://blog.sina.com.cn/rss/cng.xml";
    const _url = "https://gadgets.ndtv.com/rss/feeds";
    const headers = new Headers;
    headers.append('Access-Control-Allow-Origin', '*');
    const requestOptions: Object = {
      headers: headers,
      observe: 'body',
      responseType: 'text',
    };

    // this.http.jsonp(_url, 'callback').subscribe((data: any) => {
    //   console.log(data);

    //   let parseString = xml2js.parseString;
    //   parseString(data, (err,result: NewsRss) => {
    //     console.log(result);
    //     console.log(err);
    //     this.RssData = result;
    //   });
    // });

    this.http.get<any>(_url, requestOptions).subscribe((data) => {
      console.log(data);
      let parseString = xml2js.parseString;
      parseString(data, (err,result: NewsRss) => {
        console.log(result);
        console.log(err);
        this.RssData = result;
      });
    });
  }

  getDateDiff(endDate: Date) {
    let setDate = new Date(endDate).toISOString();
    var diff = (new Date()).getTime() - new Date(setDate).getTime();
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor(diff / (1000 * 60 * 60)) - (days * 24);
    var minutes = Math.floor(diff / (1000 * 60)) - (days * 24 * 60) - (hours * 60);
    let dayString = days == 0 ? "" : days + "days ";
    let hourString = hours == 0 ? "" : hours + "hr ";
    let minString = minutes == 0 ? "" : minutes + "m ";

    return dayString + hourString + minString;
  }
}
