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
    this.room = this.data.getRoomList(this.id);
  }
  onDelete(item) {
    this.data.deleteRoom(item.id);
  }
}
