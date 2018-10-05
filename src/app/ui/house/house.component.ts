import { Component, OnInit } from "@angular/core";
import { DataService } from "../../core/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-house",
  templateUrl: "./house.component.html",
  styleUrls: ["./house.component.css"]
})
export class HouseComponent implements OnInit {
  constructor(private data: DataService, private router: Router) {}
  house;
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.house = this.data.getHouseList();
  }
  onDelete(item) {
    this.data.deleteHouse(item.id);
    this.getData();
  }
}
