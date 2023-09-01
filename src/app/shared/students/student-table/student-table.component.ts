import { Component, Input, OnInit } from '@angular/core';
import { Istudent } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: [ './student-table.component.scss' ]
})
export class StudentTableComponent implements OnInit {

  @Input()
  studentArr!: Istudent[]

  constructor(
    private _studentService: StudentService,
    private matdialog: MatDialog,
    private _snackbarservice: SnackbarService
  ) { }

  ngOnInit(): void {
  }



  // ondelete(id: string) {

  //   console.log(id)
  //   this._studentService.deleteStudents(id)
  //     .subscribe((res: Istudent) => {
  //       console.log(res)
  //       alert("Employee deleted")


  //     })
  // }

  ondelete(i: string) {
    console.log(i);
    this._studentService.deleteStudents(i)
      .subscribe(res => {
        console.log(res)
        this._snackbarservice.openSnackbar('Data deleted successfully....!!!')


        // this.studentArr = this.studentArr.filter(e => e.id !== i)
        this.studentArr.forEach((e, m) => {
          if (e.id === i) {
            this.studentArr.splice(m, 1)
          }
        })
      })
  }

  onEdit(obj: Istudent) {
    console.log(obj);

    let dialogConfig = new MatDialogConfig
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = obj

    this.matdialog.open(StudentFormComponent, dialogConfig)
  }
}
