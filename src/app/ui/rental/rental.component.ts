import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../core/data.service";
import { ActivatedRoute } from "@angular/router";

interface Tanent {
  id?: string;
  name?: string;
  member?: string;
}

interface Rental {
  room_id?: string;
}

@Component({
  selector: "app-rental",
  templateUrl: "./rental.component.html",
  styleUrls: ["./rental.component.css"]
})
export class RentalComponent implements OnInit {
  id;
  room;
  house;
  houseName = false;
  tanent: Tanent = {};
  rental: Rental = {};
  constructor(private data: DataService, private router: ActivatedRoute) {
    this.id = router.snapshot.params.id;
  }

  ngOnInit() {
    this.data.getTanentDetail(this.id).subscribe(res => {
      this.tanent = res;
    });
    this.house = this.data.getHouseList();
  }

  onChangeHouse(event) {
    this.houseName = event.target.value !== "null" ? event.target.value : false;
    if (this.houseName) {
      this.data.getRoomList().subscribe(res => {
        this.room = this.data.filterByField(res, "house_id", this.houseName);
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
  }
}
