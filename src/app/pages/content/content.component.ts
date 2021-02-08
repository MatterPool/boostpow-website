import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/_services/api.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  content: any;

  constructor(private api: APIService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getContent(id);
  }

  async getContent(id: string) {
    try {
      this.content = await this.api.getOne(id);
    } catch(e) {
      console.error(e);
    }
  }
}
