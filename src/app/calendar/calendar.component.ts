import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  objElement = {};
  constructor() { }

  ngOnInit() {
    this.objElement={
      date:moment().format('MMMM YYYY'),
      formatDate:moment()
    };
    this.initCalendar(this.objElement['formatDate']);
  }
  initCalendar(actualDate:Object){
    console.log(actualDate);
  }
  nextMonth(){
    this.objElement={
      date:moment(this.objElement['formatDate']).add(1,'M').format('MMMM YYYY'),
      formatDate:moment(this.objElement['formatDate']).add(1,'M')
    }
    this.initCalendar(this.objElement['formatDate']);
  }
  previousMonth(){
    this.objElement={
      date:moment(this.objElement['formatDate']).subtract(1,'M').format('MMMM YYYY'),
      formatDate:moment(this.objElement['formatDate']).subtract(1,'M')
    }
    this.initCalendar(this.objElement['formatDate']);
  }

}
