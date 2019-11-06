import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-monthpicker',
  templateUrl: './monthpicker.component.html',
  styleUrls: ['./monthpicker.component.css']
})
export class MonthpickerComponent implements OnInit {
  @Input() year: number;
  @Input() month: number;
  
  @Input() multiple: boolean; // TODO
  
  @Output() change = new EventEmitter<{ monthIndex: number, year: number }>();
  
  model: MonthPickerModel;
  
  ngOnInit() 
  {
    moment.locale('en');
    this.model = new MonthPickerModel();
    
    if (this.year) {
      this.model.selectedYearMoment = moment().year(this.year);
      this.model.updateYearText();
    }
    
    if (this.month) {
      this.model.selectedMonthIndex = this.month;
      this.model.selectedMonthMoment = moment().month(this.month);
      if (this.year) this.model.selectedMonthYear = this.year;
    }
    
    this.onChange(this.model.selectedMonthIndex, this.model.selectedMonthYear);
  }
  
  decrement() {
    this.model.decrementYear();
    if (this.isShowYears) {
      this.renderYears();
    }
  }
  
  increment() {
    this.model.incrementYear();
    if (this.isShowYears) {
      this.renderYears();
    }
  }
  
  selectMonth(index: number) {
    this.model.selectMonth(index);
    this.onChange(this.model.selectedMonthIndex, this.model.selectedMonthYear);
  }
  
  isSelectedMonth(monthIndex: number) {
    return this.model.selectedMonthIndex == monthIndex && this.model.selectedMonthYear == this.model.selectedYearMoment.year();
  }
  
  onChange(monthIndex: number, year: number) {
    this.change.emit({ monthIndex: monthIndex, year: year });
  }
  
  
  isShowYears: boolean;
  years: Array<number> = [];
  toggleShowYears() {
    this.isShowYears = !this.isShowYears;
    this.renderYears();
  }
  
  renderYears() {
    this.years = [];
    for (let i = 5; i > 0; i--) {
      this.years.push(this.model.selectedYearMoment.year() - i);
    }
    for (let i = 0; i <= 6; i++) {
      this.years.push(this.model.selectedYearMoment.year() + i);
    }
  }
  
  selectYear(year: number) {
    this.isShowYears = false;
    this.model.selectedYearMoment = moment().year(year);
    this.model.updateYearText(); // in set get aendern
  }
  
  isSelectedYear(year: number){
    return this.model.selectedYearMoment.year() === year;
  }
}



// another class
export class MonthPickerModel 
{
  
  selectedYearMoment: moment.Moment;
  selectedYearText: string;
  
  selectedMonthMoment: moment.Moment;
  selectedMonthIndex: number;
  selectedMonthYear: number;
  
  months: Array<string> = [];
  
  
  constructor() 
  {
    this.selectedYearMoment = moment();
    this.updateYearText();
    
    this.selectedMonthMoment = moment();
    
    this.months = moment.months();
    
    this.selectedMonthIndex = this.selectedMonthMoment.month();
    this.selectedMonthYear = this.selectedYearMoment.year();
  }
  
  
  updateYearText() {
    this.selectedYearText = moment(this.selectedYearMoment).format('YYYY');
  }
  
  selectMonth(index: number) {
    this.selectedMonthMoment = moment().month(index);
    this.selectedMonthIndex = this.selectedMonthMoment.month();
    this.selectedMonthYear = this.selectedYearMoment.year();
  }
  
  incrementYear() {
    this.selectedYearMoment = this.selectedYearMoment.add(1, "year")
    this.updateYearText();
  }
  
  decrementYear() {
    this.selectedYearMoment = this.selectedYearMoment.subtract(1, "year")
    this.updateYearText();
  }
}
