import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../core/data.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

interface Tanent {
  id?: string;
  name?: string;
  member?: string;
}

interface Rental {
  tanent_id?: string;
  room_id?: string;
  electrity?: string;
  status?: boolean;
  current_electrity?: string;
  lastmonth_electrity?: string;
  member?: string;
}

@Component({
  selector: "app-cutoff",
  templateUrl: "./cutoff.component.html",
  styleUrls: ["./cutoff.component.css"]
})
export class CutoffComponent implements OnInit {
  rental;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth() + 1;
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

  constructor(private data: DataService) {}

  ngOnInit() {
    this.periodControl = this.generateMonthYear(this.minYear, this.maxYear);
    this.getRental();
  }

  onChangePeriod() {
    this.getRental();
  }

  onSubmit() {
    let transaction = [];
    this.rental.forEach(rent => {
      let id = `${this.currentYear}_${this.currentMonth}_${rent.id}`;
      let rental_id = rent.id;
      let current_electrity = rent.current_electrity;
      let lastmonth_electrity = rent.lastmonth_electrity;
      let tanentName = rent.tanentName;
      let member = rent.member;
      let tanentId = rent.tanentId;
      let houseId = rent.houseId;
      let roomId = rent.roomId;
      let roomName = rent.roomName;
      let created_date = new Date();
      let year = this.currentYear;
      let month = this.currentMonth;
      transaction.push({
        id,
        rental_id,
        tanentName,
        tanentId,
        current_electrity,
        lastmonth_electrity,
        created_date,
        year,
        month,
        roomId,
        houseId,
        member,
        roomName
      });
    });
    this.data.setTransactionData(transaction);
    setTimeout(() => {
      this.getRental();
    }, 1000);
  }

  getRental() {
    this.data.getRentalList().subscribe(res => {
      this.rental = this.data.filterByField(res, "status", true);
      this.rental.forEach((rentalList, index) => {
        let docRef = `${this.currentYear}_${this.currentMonth}_${
          rentalList.id
        }`;
        let docRefLastMonth = `${this.getLastPeriod()}_${rentalList.id}`;
        this.rental[index]["lastmonth_electrity"] = rentalList.electrity;
        this.data
          .getDetail("transaction_electrity", docRefLastMonth)
          .subscribe(resLastMonth => {
            if (resLastMonth["current_electrity"] != null) {
              this.rental[index]["lastmonth_electrity"] =
                resLastMonth["current_electrity"];
            }
          });
        this.data.getDetail("transaction_electrity", docRef).subscribe(res => {
          if (res["current_electrity"] != null) {
            this.rental[index]["current_electrity"] = res["current_electrity"];
          }
        });
      });
    });
  }

  getLastPeriod() {
    let month = this.currentMonth == 1 ? 12 : this.currentMonth - 1;
    let year = this.currentMonth == 1 ? this.currentYear - 1 : this.currentYear;
    return `${year}_${month}`;
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
