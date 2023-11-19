import {inject, Injectable} from '@angular/core';
import {collection, doc, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  firestore = inject(Firestore);

  getCollection(){
    return collection(this.firestore, 'mandanten');
  }

  getDocument(docID: string | null){
    if (docID){
          return  doc(this.getCollection(), docID)
    } else {
      return doc(this.getCollection(), "")
    }
  }
}
