import { Component, OnInit } from '@angular/core';
import { AutorisationService } from 'src/app/services/autorisation.service';
import Chart from 'chart.js';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/User';
import { Autorisation } from 'src/app/model/Autorisation';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {


  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  autorisationPerDay: any[];
  currentUser : User;
  autorisationGroupByYearAndMonth = {};
  totalAutorisations: number;
  approuvedAutorisations: number = 0;
  refusedAutorisations: number = 0;
  enCoursAutorisations: number = 0;
  dataOfPreviousYear: any[];
  dataOfThisYear: any[];
  currentYear = new Date().getFullYear();
  dataForMonthForYear = {};

  tableOfBolleanForCollapse = [{collap:true},{collap:true},{collap:true}];
  constructor(private autorisationService: AutorisationService,private auth:AuthenticationService) {

  }
  getAutorisationByYearByUsername(username:String) {
    this.autorisationService.getAutorisationByYearByUsername(username).subscribe(
      {
        next: (res) => {
          this.autorisationPerDay = res;
          this.transformDayToGroup();
          this.datasets = [
            this.dataOfPreviousYear,
            this.dataOfThisYear
          ];
          this.data = this.datasets[0];
          var chartOrders = document.getElementById('chart-orders');
          parseOptions(Chart, chartOptions());
          var ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: chartExample2.options,
            data: chartExample2.data
          });
          var chartSales = document.getElementById('chart-sales');
          this.salesChart = new Chart(chartSales, {
            type: 'bar',
            options: chartExample1.options,
            data: chartExample1.data
          });
          this.updateOptions()
        }
      }
    )
  }
  transformDayToGroup() {
    var result = [];
    for (let element of this.autorisationPerDay) {
      var object = {}
      object[element.day] = element.numAuto;
      result.push(object);
    }
    this.autorisationGroupByYearAndMonth = this.calc(result);
    var dataForMonth: Number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var year in this.autorisationGroupByYearAndMonth) {
      for (let month in this.autorisationGroupByYearAndMonth[year]) {
        switch (month) {
          case '01':
            dataForMonth[0] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '02':
            dataForMonth[1] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '03':
            dataForMonth[2] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '04':
            dataForMonth[3] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '05':
            dataForMonth[4] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '06':
            dataForMonth[5] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '07':
            dataForMonth[6] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '08':
            dataForMonth[7] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '09':
            dataForMonth[8] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '10':
            dataForMonth[9] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '11':
            dataForMonth[10] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          case '12':
            dataForMonth[11] = this.autorisationGroupByYearAndMonth[year][month];
            break;
          default:
        }
      }
      this.dataForMonthForYear[year] = dataForMonth;
      dataForMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    this.dataOfPreviousYear = this.dataForMonthForYear[this.currentYear - 1];
    this.dataOfThisYear = this.dataForMonthForYear[this.currentYear];
    return this.dataForMonthForYear;
  }




  calc(dates) {
    var response = {};
    dates.forEach(function (d) {
      for (var k in d) {
        var _ = k.split("-");
        var year = _[0]
        var month = _[1]
        if (!response[year]) response[year] = { total: 0 }
        response[year][month] = response[year][month] ? response[year][month] + d[k] : d[k]
        response[year].total += d[k]
      }
    });
    return response;
  }



  autorisations: Autorisation[];
  last3Autorisation : Autorisation[];
  getAutorisationByUsername() {
    this.autorisationService.getAutorisationByUsername(this.currentUser.username).subscribe(
      {
        next: (resp) => {
          this.autorisations= resp;
          this.last3Autorisation = this.autorisations.slice(-3);
          this.totalAutorisations = resp.length;
          for (let element of resp) {
            if (element.state == "Approved") {
              this.approuvedAutorisations += 1;
            }
            if (element.state == "Refused") {
              this.refusedAutorisations += 1;
            }
            if (element.state == "En Cours") {
              this.enCoursAutorisations += 1;
            }
          }
          const data = {
            labels: [
              'Refused Autorisations',
              'Approuved Autorisations',
              'En cours Autorisations '
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [this.refusedAutorisations, this.approuvedAutorisations, this.enCoursAutorisations],
              backgroundColor: [
                'rgb(245, 54, 92)',
                'rgb(45, 206, 137)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
          // Init chart
          var chartDoughnut = document.getElementById('chart-doughnut');
          var doughnutChart = new Chart(chartDoughnut, {
            type: 'doughnut',
            data: data,
            //  options: chartDoughnutData.options
          });
        }

      }
    )
  }


  setUpLastThreeAuthorisation()
{
  

}

  ngOnInit() {
    this.currentUser =this.auth.currentUserValue;
    this.getAutorisationByUsername();
    this.getAutorisationByYearByUsername(this.currentUser.username);
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }


}
