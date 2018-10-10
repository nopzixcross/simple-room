import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../../core/data.service";
import { ActivatedRoute } from "@angular/router";

interface Tanent {
  id?: string;
  name?: string;
}

interface Rental {
  tanent_id?: string;
  room_id?: string;
  electrity?: string;
  member?: string;
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
  houseName = false;
  tanent: Tanent = {};
  rental: Rental = { room_id: "", status: true };
  constructor(private data: DataService, private router: ActivatedRoute) {
    this.id = router.snapshot.params.id;
    this.rental.tanent_id = this.id;
  }

  ngOnInit() {
    this.data.getTanentDetail(this.id).subscribe(res => {
      this.tanent = res;
    });
    this.house = this.data.getHouseList();
  }

  onChangeHouse(event) {
    this.rental.room_id = "";
    this.houseName = event.target.value !== "null" ? event.target.value : false;
    if (this.houseName) {
      this.data.getRoomList().subscribe(res => {
        this.room = this.data.filterByField(res, "house_id", this.houseName);
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.rental.room_id || !this.rental.electrity) {
      return;
    }
    let { tanent_id, room_id, electrity, member, status } = this.rental;
    this.data.addRentalDetail({
      tanent_id,
      room_id,
      electrity: parseFloat(electrity),
      member: parseFloat(member),
      status
    });
  }
}
