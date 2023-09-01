import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentService } from '../../services/student.service';
import { map } from 'rxjs';
import { Istudent } from '../../models/student';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: [ './student-dashboard.component.scss' ]
})
export class StudentDashboardComponent implements OnInit {

  studentArray!: Istudent[]
  constructor(
    private matdialog: MatDialog,
    private _studentService: StudentService,

  ) { }

  ngOnInit(): void {
    this._studentService.getAllStudentData()
      .subscribe(res => {
        console.log(res);
        this.studentArray = res
      })

    this._studentService.sendObj
      .subscribe(res => {
        if (res) {
          this.studentArray.unshift(res)
        }
      })

    this._studentService.updatedObj
      .subscribe(res => {
        if (res) {
          this.studentArray.forEach(e => {
            if (e.id === res.id) {
              e.Fname = res.Fname
              e.Lname = res.Lname
              e.Contact = res.Contact
              e.Email = res.Email
              e.Rollno = res.Rollno
              e.Gender = res.Gender
            }
          })
        }
      })
  }



  Onaddstudent() {
    // this.matdialog.open(
    //   StudentFormComponent


    let dialogConfig = new MatDialogConfig
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this.matdialog.open(StudentFormComponent, dialogConfig)

  }

}
