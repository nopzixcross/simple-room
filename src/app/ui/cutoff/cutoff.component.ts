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
  lastmonth_electrity?: string;
  current_electrity?: string;
}

interface TransactionData {
  id?: string;
  rental_id?: string;
  current_electrity?: string;
  lastmonth_electrity?: string;
}

@Component({
  selector: "app-cutoff",
  templateUrl: "./cutoff.component.html",
  styleUrls: ["./cutoff.component.css"]
})
export class CutoffComponent implements OnInit {
  rental;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  minYear = this.currentYear !== 2018 ? 2018 : this.currentYear;
  maxYear = this.minYear !== 2018 ? 2018 : this.currentYear + 5;
  periodControl;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.periodControl = this.generateMonthYear(this.minYear, this.maxYear);
    this.getRental();
  }

  onChangeStatus(item) {
    this.data.setRentalData(item.id, { status: !item.status });
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
      transaction.push({
        id,
        rental_id,
        current_electrity,
        lastmonth_electrity
      });
    });
    this.data.setTransactionData(transaction);
  }

  getRental() {
    this.data.getRentalList().subscribe(res => {
      this.rental = this.data.filterByField(res, "status", true);
      this.rental.forEach((rentalList, index, arr) => {
        this.rental[index]["roomName"] = "";
        this.rental[index]["tanentName"] = "";
        this.data.getDetail("room", rentalList.room_id).subscribe(res => {
          this.rental[index]["roomName"] = `${res["house_id"]}_${res["name"]}`;
        });
        this.data.getDetail("tanent", rentalList.tanent_id).subscribe(res => {
          this.rental[index]["tanentName"] = res["name"];
        });
        let docRef = `${this.currentYear}_${this.currentMonth}_${
          rentalList.id
        }`;
        let docRefLastMonth = `${this.currentYear}_${this.currentMonth - 1}_${
          rentalList.id
        }`;
        this.rental[index]["lastmonth_electrity"] = rentalList.electrity;
        this.data
          .getDetail("transaction_electrity", docRefLastMonth)
          .subscribe(res => {
            if (res["current_electrity"] != null) {
              this.rental[index]["lastmonth_electrity"] =
                res["current_electrity"];
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

  generateMonthYear(minYear, maxYear) {
    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      year = [];
    for (let i = minYear; i < maxYear; i++) {
      year.push(i);
    }
    return { month, year };
  }
}
