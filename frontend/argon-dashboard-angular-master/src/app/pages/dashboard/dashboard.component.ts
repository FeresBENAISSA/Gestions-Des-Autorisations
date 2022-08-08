import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Autorisation } from 'src/app/model/Autorisation';
import { AutorisationService } from 'src/app/services/autorisation.service';
import * as _ from "lodash"
import swal from 'sweetalert2';


import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { element } from 'protractor';
import { range } from 'rxjs';
import { resolve } from 'path';
import { Console } from 'console';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/model/User';
import { ButtonsComponent } from 'src/app/components/buttons/buttons.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  autorisations: Autorisation[];
  autorisationPerDay: any[];
  autorisationGroupByYearAndMonth = {};
  totalAutorisations: number;
  approuvedAutorisations: number = 0;
  refusedAutorisations: number = 0;
  enCoursAutorisations: number = 0;
  dataOfPreviousYear: any[];
  dataOfThisYear: any[];
  currentYear = new Date().getFullYear();
  dataForMonthForYear = {};
  constructor(
    private autorisationService: AutorisationService,
    private userService: UserService,
    public datepipe: DatePipe,
    public modalService: NgbModal,
    private notifier: NotifierService
  ) {
  }
  getAutorisationByYear() {
    this.autorisationService.getAutorisationByYear().subscribe(
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

  getAutorisation() {
    this.autorisationService.getAutorisation().subscribe(
      {
        next: (resp) => {
          this.autorisations = resp;
          let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
          this.filterAutorisation(latest_date);
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

  /*Filtrer les  Autorisation */
  filteredAutorisation: Autorisation[] = [];
  state = 'En Cours'
  filteredDataExist: boolean = true;
  date: Date = new Date();
  filterAutorisation(value: any) {
    this.filteredAutorisation = [];
    if (value == 'En Cours') {
      this.state = 'En Cours'
    } else if (value == 'Approved') {
      this.state = 'Approved'
    } else if (value == 'Refused') {
      this.state = 'Refused'
    } else {
      this.date = value;
    }
    for (var auto of this.autorisations) {
      if (auto.date == this.date && auto.state == this.state) {
        this.filteredAutorisation.push(auto);
      }
    }

    if (this.filteredAutorisation.length > 0) {
      this.filteredDataExist = false;
    } else {
      this.filteredDataExist = true;
    }

  }

  usersNumber: number;
  users: User[];
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (resp) => {
        this.users = resp;
        this.usersNumber = resp.length;
      }
    })
  }

  autorisationsByUser: Autorisation[];
  totalAutorisationByUser: number = 0;
  approuvedAutorisationsByUser: number = 0;
  refusedAutorisationsByUser: number = 0;
  enCoursAutorisationsByUser: number = 0;
  stateForUser: string;
  filteredAutorisationByUser;
  filteredDataExistUser: boolean = true;
  username: string = null;
  getAutorisationByUsername(username: any) {
    // document.getElementById('selectStateForUser').value="all";
    this.autorisationService.getAutorisationByUsername(username).subscribe(
      {
        next: (resp) => {
          this.autorisationsByUser = resp;
          this.stateForUser='All';
          this.totalAutorisationByUser = 0;
          this.approuvedAutorisationsByUser = 0;
          this.refusedAutorisationsByUser = 0;
          this.enCoursAutorisationsByUser = 0;
          this.filteredAutorisationByUser = this.autorisationsByUser;
          this.totalAutorisationByUser = this.autorisationsByUser.length;
          for (let element of this.autorisationsByUser) {
            if (element.state == "Approved") {
              this.approuvedAutorisationsByUser += 1;
            }
            if (element.state == "Refused") {
              this.refusedAutorisationsByUser += 1;
            }
            if (element.state == "En Cours") {
              this.enCoursAutorisationsByUser += 1;
            }
          }
        }
      })
  }


  filterAutorisationByStateForUser(value: any) {
    this.filteredAutorisationByUser = []
    if (value == 'En Cours') {
      this.stateForUser = 'En Cours'
    } else if (value == 'Approved') {
      this.stateForUser = 'Approved'
    } else if (value == 'Refused') {
      this.stateForUser = 'Refused'
    }
    else if (value == 'All') {
      this.stateForUser = 'All';
    } else {
      this.username = value;
    }

    if (this.username != null) {
      this.getAutorisationByUsername(this.username);
    }
    if (this.stateForUser != 'All') {
      for (var auto of this.autorisationsByUser) {
        if (auto.state == this.stateForUser) {
          this.filteredAutorisationByUser.push(auto);
        }
      }
    } else {
      this.filteredAutorisationByUser = this.autorisationsByUser;
    }
  }

  // pagination
  currentPage1 = 1;
  currentPage2 = 1;
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  ngOnInit() {
    this.getAutorisationByYear();
    this.getAutorisation();
    this.getUsers();
  }

  // actions for dashborad : update 
  rowData: any;
  onOpen(action, content, id) {
    this.autorisationService.getAutorisationById(id).subscribe(
      {
        next: (resp) => {
          this.rowData = resp;
        },
        error: (err) => { console.log(err) }
      }
    )
    let refmodal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })

  }
  public Refused() {
    let updatedRowDate = this.rowData;
    updatedRowDate.state = "Refused";
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update Authtorisation state!',
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#f5365c',
    }).then((result) => {
      if (result.value) {
        this.autorisationService.updatetAutorisation(updatedRowDate).subscribe(
          {
            next: (response) => {
              this.getAutorisationByYear();
              this.getAutorisation();
              this.getUsers();
              this.notifier.notify('success', 'You are awesome! I mean it!');
              this.getAutorisationByUsername(updatedRowDate.user.username)
              this.modalService.dismissAll();
            },
            error: (err) => { console.error(err); }
          }
        )
        // Show confirmation
        swal.fire({
          title: 'Success!',
          text: 'User added successfully',
          icon: 'success',
          confirmButtonColor: '#2dce89',
        });
      }
    })
  }


  public Approved() {
    let updatedRowDate = this.rowData;
    updatedRowDate.state = "Approved";
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update Authtorisation state!',
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#f5365c',
    }).then((result) => {
      if (result.value) {
        this.autorisationService.updatetAutorisation(updatedRowDate).subscribe(
          {
            next: (response) => {
              this.getAutorisationByYear();
              this.getAutorisation();
              this.getUsers();
              this.getAutorisationByUsername(updatedRowDate.user.username)
              this.notifier.notify('success', 'You are awesome! I mean it!');
              this.modalService.dismissAll();
            },
            error: (err) => { console.error(err); }
          }
        )
        // Show confirmation
        swal.fire({
          title: 'Success!',
          text: 'User added successfully',
          icon: 'success',
          confirmButtonColor: '#2dce89',
        });
      }
    })
  }

}



