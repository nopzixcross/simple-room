import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../../core/data.service";
import { ActivatedRoute } from "@angular/router";

interface Tanent {
  id?: string;
  name?: string;
  member?: string;
}

interface Rental {
  tanent?: {};
  room?: any;
  electrity?: string;
  status?: boolean;
}

@Component({
  selector: "edit-rental",
  templateUrl: "./edit-rental.component.html",
  styleUrls: ["./edit-rental.component.css"]
})
export class EditRentalComponent implements OnInit {
  id;
  room;
  house;
  houseId = false;
  tanent: Tanent = {};
  rental: Rental = { room: "", status: true };
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
    this.rental.room = "";
    this.houseId = event.target.value !== "null" ? event.target.value : false;
    if (this.houseId) {
      this.room = this.data.getRoomList(this.houseId);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.rental.room || !this.rental.electrity) {
      return;
    }
    let room = JSON.parse(this.rental.room);
    let tanentId = this.tanent.id;
    let tanentName = this.tanent.name;
    let member = this.tanent.member;
    let houseId = this.houseId;
    let roomId = room.id;
    let roomName = room.name;
    let roomRate = room.rate;
    this.data.addRentalDetail({
      tanentId,
      tanentName,
      houseId,
      roomId,
      roomName,
      roomRate,
      member,
      electrity: parseFloat(this.rental.electrity),
      status: this.rental.status
    });
  }
}
