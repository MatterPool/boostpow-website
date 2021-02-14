import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/_services/api.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  faSpinner = faSpinner;

  @ViewChild('md') md:ElementRef;

  @Input() content: any;
  @Input() compact: boolean = false;
  loading:boolean = true;

  type = '';
  fileType = "";
  plainText = "";
  loaded = false;

  constructor(private api: APIService, private router: Router) { }

  ngOnInit(): void {
    this.getFileType(this.content);
  }

  async getFileType(c:string){
    try {
      this.fileType = await this.api.getFileType(c);
      this.type = this.getImageType(this.fileType);
    } catch(e){
      this.type === 'unknown'
    }
    // if(this.type === 'pdf') {
    //   this.loaded = true;
    // }
    if(this.type === 'text' || this.type === 'unknown' || this.type === ''){
      this.plainText = this.hexToAscii(c);
      this.loaded = true;
    }
  }

  getImageType(t?:string): string {
    if(/image\/(png|jpg|jpeg|gif|webp|ico|tiff|svg\+xml|svg)/gmi.test(t)){
      return 'image';
    } else if(/text\/markdown/gmi.test(t)){
      return 'markdown';
    } else if(/video\//gmi.test(t)){
      return 'video';
    } else if(/audio\//gmi.test(t)){
      return 'video';
    } else if(/text\//gmi.test(t)){
      return 'text';
    } else if(/application\/pdf/gmi.test(t)){
      this.loaded = true;
      return 'pdf';
    } else {
      return 'unknown';
    }
  }

  openLink(){
    if(this.compact){
      this.router.navigate(['/c/'+this.content]);
    }
  }

  hexToAscii(s: string) {
    if(!s.length) return '';
    let str = '';
    for (var n = 0; n < s.length; n += 2) {
      str += String.fromCharCode(parseInt(s.substr(n, 2), 16));
    }
    return str;
  }

  fixB () {
    // console.log(this.md);
    let images = this.md?.nativeElement.querySelectorAll('img');
    images.forEach(i => {
      i.src = i.src.replace(/(unsafe:)?(b:\/\/)/gm, "https://media.bitcoinfiles.org/")
    });
    let links = this.md?.nativeElement.querySelectorAll('a');
    links.forEach(l => {
      l.href = l.href.replace(/(unsafe:)?(b:\/\/)/gm, "https://bitcoinfiles.org/t/");
    });
    this.loaded = true;
  }

}
