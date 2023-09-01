import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Istudent } from '../../models/student';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: [ './student-form.component.scss' ]
})
export class StudentFormComponent implements OnInit {

  constructor(
    private _studentService: StudentService,
    private _matdialogRef: MatDialogRef<StudentFormComponent>,
    private _snackbarservice: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public obj: Istudent
  ) { }

  studentForm !: FormGroup;


  ngOnInit(): void {

    this.studentForm = new FormGroup({
      Fname: new FormControl(null, Validators.required),
      Lname: new FormControl(null, Validators.required),
      Contact: new FormControl(null, Validators.required),
      Email: new FormControl(null, Validators.required),
      Gender: new FormControl(null, Validators.required),
      Rollno: new FormControl(null, Validators.required)
    })

    if (this.obj) {
      this.studentForm.patchValue(this.obj)
    }
  }

  postdata() {
    if (this.studentForm.valid) {
      // console.log(this.studentForm.value, 'form value')
      this._studentService.createStudentData(this.studentForm.value)
        .subscribe(res => {
          // console.log(res);

          let obj: Istudent = {
            ...this.studentForm.value,
            id: res.name
          }
          //  console.log(obj, 'id added');

          this._studentService.sendObj.next(obj)
          this.studentForm.reset()
          this._matdialogRef.close()
          this._snackbarservice.openSnackbar('Data submited successfully....!!!')

        })
    } else {
      this._snackbarservice.openSnackbar('please fill all the data...!!!')

    }
  }


  get f() {
    return this.studentForm.controls
  }


  onUpdate() {
    console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      this._studentService.onupdatestudents(this.obj.id!, this.studentForm.value)
        .subscribe((res => {
          // console.log(res)
          this._matdialogRef.close()

          let obj1 = {
            ...this.studentForm.value,
            id: this.obj.id
          }
          this._studentService.updatedObj.next(obj1)
          this._snackbarservice.openSnackbar('Data updated successfully....!!!')
        }))
    } else {
      this._snackbarservice.openSnackbar('please update data ..!!!')

    }

  }



}
