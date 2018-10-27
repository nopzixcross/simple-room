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
    });
  }

  onChangeStatus(item) {
    this.data.setRentalData(item.id, { status: !item.status });
  }

  onDelete(item) {
    this.data.deleteRental(item.id);
  }
}
