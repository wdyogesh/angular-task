import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements OnInit {

    dataForm: FormGroup;
    fetchdata;
    errorMsg;
    fetchdataByUid;
    name;
  status: any;
  email: any;
  mobile: any;
  id: any;
  moduleLists: Object;
  permissions = ['Create', 'Read', 'Update', 'Delete'];


    constructor(private frmbuilder: FormBuilder,private http: HttpClient,private router: Router,private toastr: ToastrManager) {}

    ngOnInit() {
        this.dataForm = this.frmbuilder.group({
            id: ['', null],
            name: ['', Validators.required],
            mobile: ['', Validators.required],
            email: ['', Validators.required],
            status: ['', Validators.required],
            module: ['', Validators.required],
            });
        this.getData();
    }

    getData(){
        this.http.post('http://localhost/backend/read.php', {data: '', _method: 'getAllUsers'}).subscribe(
            data => {
                this.fetchdata = data;
                console.log('Data fetched is successful ', data);
            },
            error => {
                console.log('Error', error);
                this.errorMsg = error;
            }
        );
    }

    PostData(dataForm) {
        this.http.post('http://localhost/backend/insert.php', dataForm).subscribe(
            data => {
                console.log('POST Request is successful ', data);
                this.getData();
                this.dataForm.reset('');
                this.showSuccess("Data Inserted :)");
            },
            error => {
                console.log('Error', error);
                this.errorMsg = error;
            }
        );
    }

    updateData(dataForm) {
        this.http.post('http://localhost/backend/update.php', dataForm).subscribe(
            data => {
                console.log('Update Request is successful ', data);
                this.getData();
                this.dataForm.reset('');
                this.showSuccess("Data Updated :)");
            },
            error => {
                console.log('Error', error);
                this.errorMsg = error;
            }
        );
    }

    deleteData(dataForm) {
        this.http.post('http://localhost/backend/delete.php', dataForm).subscribe(
            data => {
                console.log('Delete Request is successful ', data);
                this.getData();
                this.dataForm.reset('');
                this.showWarning("Data Deleted :(");
            },
            error => {
                console.log('Error', error);
                this.errorMsg = error;
            }
        );
    }

    getUserOnchange(getId) {
      console.log(getId);
    }

    // Toast function
    showSuccess(msg) {
        this.toastr.successToastr(msg, 'Success!');
    }
    showWarning(msg) {
        this.toastr.warningToastr(msg, 'Alert!');
    }

    onChangeUser(userId) {
      this.http.post('http://localhost/backend/read.php', {data: userId, _method: 'getUserById'}).subscribe(
            data => {
              this.fetchdataByUid = data;
              this.id = this.fetchdataByUid[0].id;
              this.name = this.fetchdataByUid[0].name;
              this.email = this.fetchdataByUid[0].Email;
              this.mobile = this.fetchdataByUid[0].mobile;
              this.status = this.fetchdataByUid[0].status == 0 ? 'InActive' : 'Active';
              this.moduleList();
            },
            error => {
                console.log('Error', error);
                this.errorMsg = error;
            }
        );
    }

    moduleList() {
      this.http.post('http://localhost/backend/read.php', {data: '', _method: 'getModuels'}).subscribe(
        data => {
          this.moduleLists = data;
          console.log(this.moduleLists);
        },
        error => {
            console.log('Error', error);
            this.errorMsg = error;
        }
    );
    }

    onCheckboxChange(e: any) {
      const checkArray = [];
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
      }
      console.log('Check', checkArray);
    }


    loadSome() {
        this.router.navigate(['parent', 'Hii Scope']);
    }
}
