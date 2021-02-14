import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-boost',
  templateUrl: './boost.component.html',
  styleUrls: ['./boost.component.scss']
})
export class BoostComponent {

  @Input() content: any;
  @Input() topic: string;
  @Input() difficulty: number;
  @Input() rank: number;

  constructor(private api: APIService, private router: Router) { }

  async addBoost() {
    await boostPublish.open({
      label: 'Boost Content',
      content: this.content,
      outputs: [],
      topic: {
        value: this.topic, 
        show: true
      },
      onPayment: async (e) => {
        console.log('onPayment', e);
        setTimeout(() => {
          console.log('timeout fired', e);
        }, 4000);
      }
    });
    return false;
  }

}