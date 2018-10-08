import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../core/data.service";

@Component({
  selector: "app-rental",
  templateUrl: "./rental.component.html",
  styleUrls: ["./rental.component.css"]
})
export class RentalComponent implements OnInit {
  rental;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getRentalList().subscribe(res => {
      this.rental = res;
      this.rental.forEach((rentalList, index, arr) => {
        this.rental[index]["roomName"] = "";
        this.rental[index]["tanentName"] = "";
        this.data.getDetail("room", rentalList.room_id).subscribe(res => {
          this.rental[index]["roomName"] = `${res["house_id"]}_${res["name"]}`;
        });
        this.data.getDetail("tanent", rentalList.tanent_id).subscribe(res => {
          this.rental[index]["tanentName"] = res["name"];
        });
      });
    });
  }

  onChangeStatus(item) {
    this.data.setRentalData(item.id, { status: !item.status });
  }
}
