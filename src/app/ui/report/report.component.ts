import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../core/data.service";
import { forkJoin, concat, combineLatest, pipe, Subject } from "rxjs";
import { map, merge } from "rxjs/operators";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"]
})
export class ReportComponent implements OnInit {
  object: { [key: number]: string } = { 2: "foo", 1: "bar" };
  reportDetail = {};
  rental;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  monthDes = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
  ];
  minYear = this.currentYear !== 2018 ? 2018 : this.currentYear;
  maxYear = this.minYear !== 2018 ? 2018 : this.currentYear + 5;
  periodControl;
  constructor(private data: DataService) {
    Array.prototype["groupBy"] = function(prop) {
      return this.reduce(function(groups, item) {
        const val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
      }, {});
    };
  }

  ngOnInit() {
    this.periodControl = this.generateMonthYear(this.minYear, this.maxYear);
    this.data.getRentalList().subscribe(rental => {
      rental.forEach(rent => {
        let docRef = `${this.currentYear}_${this.currentMonth}_${rent.id}`;
        let electrity = this.data.getDetail("transaction_electrity", docRef);
        let room = this.data.getDetail("transaction_room", docRef);
        let watersupply = this.data.getDetail(
          "transaction_watersupply",
          docRef
        );
        combineLatest(electrity, room, watersupply).subscribe(res => {
          let resultObject = res.reduce(function(result, currentObject) {
            for (var key in currentObject) {
              if (currentObject.hasOwnProperty(key)) {
                result[key] = currentObject[key];
              }
            }
            return result;
          }, {});
          if (!this.reportDetail[resultObject["tanentName"]])
            this.reportDetail[resultObject["tanentName"]] = [];
          this.reportDetail[resultObject["tanentName"]].push(resultObject);
          console.log(this.reportDetail);
        });
      });
    });
  }

  generateMonthYear(minYear, maxYear) {
    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      year = [];
    for (let i = minYear; i < maxYear; i++) {
      year.push(i);
    }
    return { month, year };
  }
}
