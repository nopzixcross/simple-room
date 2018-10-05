import { Component, OnInit } from "@angular/core";
import { DataService } from "../../core/data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"]
})
export class RoomComponent implements OnInit {
  room;
  id;
  constructor(private data: DataService, private router: ActivatedRoute) {
    this.id = router.snapshot.params.id;
  }
  ngOnInit() {
    this.data.getRoomList().subscribe(res => {
      this.room = this.data.filterByField(res, "house_id", this.id);
    });
  }
  onDelete(item) {
    this.data.deleteRoom(item.id);
  }
}
