import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Data} from '../../providers/data/data';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Data]
})
export class HomePage {
  public result: string[] = []
  public inputText;
  private words: any;
  private converter: any;
  private dataService:Data;
  public loading:boolean = false;


  constructor(public navCtrl: NavController, data: Data) {
    this.dataService = data;
    this.words = data.getWords();
    this.converter = new EncodingConverter();
  }

  public clear(){
    this.result = [];
    this.inputText = '';
  }

  public rhymeSeach(){
    this.result =[];
    this.result.push('will be implemented shortly')
  }

  public regexSearch(): void {

    if (!this.inputText) return;

    

    this.result = [];
    this.loading = true;
    var stringPattern = this.converter.toLatin(this.inputText);

    //todo escape \ sign
    var regexPattern = new RegExp(stringPattern)
    
    this.dataService.getRegexSearchResult(regexPattern).then(result=> {
      this.loading = false;
      this.result = result;
    });
    

  }
}


function EncodingConverter() {
  var geoToLatinBinding = [
    'a', 'b', 'g', 'd', 'e', 'v', 'z', 'T', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'J', 'r', 's', 't', 'u', 'f', 'q', 'R', 'y', 'S', 'C', 'c', 'Z', 'w', 'W', 'x', 'j', 'h'
  ];
  var latinToGeoBinding = [
    'A', 'B', 'ჩ', 'D', 'E', 'F', 'G', 'H', 'I', 'ჟ', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'ღ', 'შ', 'თ', 'U', 'V', 'ჭ', 'X', 'Y', 'ძ', '[', '\\', ']', '^', '_', '`', 'ა', 'ბ', 'ც', 'დ', 'ე', 'ფ', 'გ', 'ჰ', 'ი', 'ჯ', 'კ', 'ლ', 'მ', 'ნ', 'ო', 'პ', 'ქ', 'რ', 'ს', 'ტ', 'უ', 'ვ', 'წ', 'ხ', 'ყ', 'ზ'
  ];

  this.toLatin = function (geoWord) {
    return convert(geoWord, geoToLatinBinding, 'ა', 'ჰ', 4304);
  }

  this.toGeorgian = function (latinWord) {
    return convert(latinWord, latinToGeoBinding, 'A', 'z', 65);
  }

  function convert(word, binding, min, max, charNum) {
    var buffer = []
    var i = 0;
    word.split('').forEach(function (c) {
      if (c >= min && c <= max) {
        buffer[i++] = binding[c.charCodeAt(0) - charNum];
      } else {
        buffer[i++] = c;
      }
    });
    return buffer.join('');
  }
}