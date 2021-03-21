import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-database-one-line-result',
  templateUrl: './database-one-line-result.component.html',
  styleUrls: ['./database-one-line-result.component.scss']
})
export class DatabaseOneLineResultComponent implements OnInit {
  @Input() type: 'OK' | 'ERROR' = 'OK';
  constructor() { }

  ngOnInit(): void {
  }

}
