import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input() concluidas = 0;
  @Input() total = 100;

  constructor() { }

  ngOnInit(): void {
  }

  percentual(): string {
    return (this.concluidas / this.total * 100).toFixed(2) + '%';
  }

}
