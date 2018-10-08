import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class DataService {
  constructor(private db: AngularFirestore) {}

  getHouseList() {
    let data = [];
    let idx = 0;
    this.db.firestore
      .collection("house")
      .orderBy("name")
      .get()
      .then(house => {
        house.forEach(doc => {
          let roomData = [];
          let houseData = doc.data();
          let houseID = doc.id;
          data.push({ id: houseID, ...houseData });
          this.db.firestore
            .collection("room")
            .where("house_id", "==", houseData.name)
            .get()
            .then(res => {
              res.forEach(room => {
                roomData.push(room.data());
              });
            });
          data[idx]["room"] = roomData;
          idx++;
        });
      });
    return data;
  }

  getHouseDetail(id) {
    return this.getDetail("house", id);
  }

  getTanentList() {
    return this.getDataList("tanent");
  }

  getRentalList() {
    return this.getDataList("rental");
  }

  getTanentDetail(id) {
    return this.getDetail("tanent", id);
  }

  getCostList() {
    return this.getDataList("cost");
  }

  getCostDetail(id) {
    return this.getDetail("cost", id);
  }

  getRoomList() {
    return this.getDataList("room");
  }

  getRoomDetail(id) {
    return this.getDetail("room", id);
  }

  getRentalDetail(id) {
    return this.getDetail("rental", id);
  }

  filterByField(data, field, value) {
    return data.filter(res => {
      return res[field] == value;
    });
  }

  getDetail(collection, documentId) {
    return this.db
      .collection(collection)
      .doc(documentId)
      .snapshotChanges()
      .pipe(
        map(res => {
          const id = res.payload.id;
          const detail = res.payload.data();
          return { id, ...detail };
        })
      );
  }

  getDataList(collection) {
    return this.db
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(res => {
            const id = res.payload.doc.id;
            const doc = res.payload.doc.data();
            return { id, ...doc };
          });
        })
      );
  }

  addHouseDetail(data) {
    return this.addDetail("house", data);
  }

  addRoomDetail(data) {
    return this.addDetail("room", data);
  }

  addCostDetail(data) {
    return this.addDetail("cost", data);
  }

  addTanentDetail(data) {
    return this.addDetail("tanent", data);
  }

  addRentalDetail(data) {
    return this.addDetail("rental", data);
  }

  addDetail(collection, data) {
    return this.db
      .collection(collection)
      .add(data)
      .then(function() {
        console.log("Document successfully added!");
      })
      .catch(function(error) {
        console.error("Error add document: ", error);
      });
  }

  setRentalData(documentId, data) {
    return this.setData("rental", documentId, data);
  }

  setTransactionData(data) {
    let electrityUnit;
    let waterSupplyUnit;
    this.getDetail("cost", "F6nKkGBmbpkSEnwuDuyZ").subscribe(res => {
      electrityUnit = parseFloat(res["value"]);
      data.forEach(transaction => {
        let { current_electrity, lastmonth_electrity, rental_id } = transaction;
        let value = electrityUnit;
        let unit = current_electrity - lastmonth_electrity;
        let amount = unit * value;
        return this.setData("transaction_electrity", transaction.id, {
          rental_id,
          current_electrity: parseFloat(current_electrity),
          lastmonth_electrity: parseFloat(lastmonth_electrity),
          unit,
          amount,
          value
        });
      });
    });
    this.getDetail("cost", "WhMxKfUhFylH8zDIp8H1").subscribe(res => {
      waterSupplyUnit = parseFloat(res["value"]);
      data.forEach(transaction => {
        this.getRentalDetail(transaction.rental_id).subscribe(res => {
          this.getTanentDetail(res["tanent_id"]).subscribe(res => {
            let unit = res["member"];
            let value = waterSupplyUnit;
            let amount = unit * value;
            return this.setData("transaction_watersupply", transaction.id, {
              amount,
              unit,
              value
            });
          });
        });
      });
    });
  }

  setData(collection, documentId, data) {
    return this.db
      .collection(collection)
      .doc(documentId)
      .set(data, { merge: true })
      .then(function() {
        console.log("Document successfully added!");
      })
      .catch(function(error) {
        console.error("Error add document: ", error);
      });
  }

  updateHouseDetail(documentId, data) {
    return this.updateDetail("house", documentId, data);
  }

  updateCostDetail(documentId, data) {
    return this.updateDetail("cost", documentId, data);
  }

  updateTanentDetail(documentId, data) {
    return this.updateDetail("tanent", documentId, data);
  }

  updateRoomDetail(documentId, data) {
    return this.updateDetail("room", documentId, data);
  }

  updateDetail(collection, documentId, data) {
    return this.db
      .collection(collection)
      .doc(documentId)
      .update(data)
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  }

  deleteHouse(id) {
    return this.deleteData("house", id);
  }

  deleteRoom(id) {
    return this.deleteData("room", id);
  }

  deleteCost(id) {
    return this.deleteData("cost", id);
  }

  deleteTanent(id) {
    return this.deleteData("tanent", id);
  }

  deleteData(collection, documentId) {
    return this.db
      .collection(collection)
      .doc(documentId)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  }
}
