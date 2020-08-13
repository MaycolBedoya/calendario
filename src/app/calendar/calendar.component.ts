import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as $ from 'jquery';
const moment = extendMoment(Moment);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  objElement = {};
  infoCalendar=[];
  constructor() { }

  ngOnInit() {
    this.objElement = {
      date: moment().format('MMMM YYYY'),
      formatDate: moment()
    };
    this.initCalendar(this.objElement['formatDate']);
  }
  initCalendar(actualDate: Object) {
    const initWeek = moment(actualDate).startOf('month').startOf('isoWeek');
    const endWeek = moment(actualDate).endOf('month').endOf('isoWeek');
    const initMonth = moment(actualDate).startOf('month');
    const endMonth = moment(actualDate).endOf('month');

    const dateRange = moment.range(initWeek, endWeek);
    const daysArray = Array.from(dateRange.by('days'));
    const weeksArray = Array.from(dateRange.by('weeks'));

    let objDates;
    const array = [];

    _.forEach(weeksArray, function (value) {
      objDates = {
        week: value.isoWeek(),
        days: []
      }
      _.forEach(daysArray, function (day) {
        if (value.isoWeek() === day.isoWeek()) {
          objDates.days.push({
            formatDate: day,
            date: day.format('DD-MM-YYYY'),
            week: day.isoWeek(),
            day: day.format('DD'),
            actualDate: moment(day.format('DD-MM-YYYY')).isSame(moment().format('DD-MM-YYYY')),
            isActualMonth: day.isBetween(initMonth, endMonth, null, '[]')
          })
        }
      })
      array.push(objDates);
    });
    this.infoCalendar=array;
  }
  nextMonth() {
    this.objElement = {
      date: moment(this.objElement['formatDate']).add(1, 'M').format('MMMM YYYY'),
      formatDate: moment(this.objElement['formatDate']).add(1, 'M')
    }
    this.initCalendar(this.objElement['formatDate']);
  }
  previousMonth() {
    this.objElement = {
      date: moment(this.objElement['formatDate']).subtract(1, 'M').format('MMMM YYYY'),
      formatDate: moment(this.objElement['formatDate']).subtract(1, 'M')
    }
    this.initCalendar(this.objElement['formatDate']);
  }

}
