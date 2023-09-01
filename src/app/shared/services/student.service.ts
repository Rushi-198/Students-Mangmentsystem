import { Injectable } from '@angular/core';
import { Istudent } from '../models/student';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private _http: HttpClient
  ) { }

  sendObj: Subject<Istudent> = new Subject<Istudent>()
  updatedObj: Subject<Istudent> = new Subject<Istudent>()


  createStudentData(obj: Istudent): Observable<any> {
    let postUrl = `${environment.baseUrl}student.json `
    return this._http.post<Istudent>(postUrl, obj)
  }


  getAllStudentData(): Observable<Istudent[]> {
    let getUrl = `${environment.baseUrl}student.json `
    return this._http.get<Istudent[]>(getUrl)
      .pipe(
        map(res => {
          let arr = []

          for (let key in res) {

            let obj = {
              Contact: res[ key ].Contact,
              Email: res[ key ].Email,
              Fname: res[ key ].Fname,
              Gender: res[ key ].Gender,
              Lname: res[ key ].Lname,
              Rollno: res[ key ].Rollno,
              id: key
            }
            arr.unshift(obj)
          }
          return arr
        })
      )
  }


  // delete data firebase

  deleteStudents(id: string): Observable<Istudent> {
    return this._http.delete<Istudent>(`${environment.baseUrl}student/${id}/.json`)
  }



  // edit data firebase


  onupdatestudents(id: string, obj: Istudent): Observable<Istudent> {
    return this._http.patch<Istudent>(`${environment.baseUrl}student/${id}/.json`, obj)
  }


}
