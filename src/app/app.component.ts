import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
import { UserService } from 'src/services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  contacto: any;
  submitted = false;
  loading = false;
  edadUsuario: any
  durationInSeconds: number
 
  constructor(private formBuilder: FormBuilder, 
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    ) { 
    this.edadUsuario = '0';
    this.durationInSeconds = 5;
  }

   ngOnInit() {
       this.contacto = this.formBuilder.group({
           nombre: ['', Validators.required],            
           apellido: ['', [Validators.required]],
           documento: ['', Validators.required],
           fecha: ['', Validators.required],
       });
   }

   get f() { return this.contacto.controls; }

   onSubmit() {
       this.submitted = true;

       if (this.contacto.invalid) {
           return;
       }


      this._userService.addUser(this.contacto.value).subscribe(
        response => {
          // alert()
          this.openSnackBar(response.message)
          this.clearForm()
        },
        error => {
          console.log(error);
        }
      );;
     
   }

   calculateAge(){
    const hoy: Date = new Date();
    const fechaNacimiento: Date = new Date(this.contacto.value.fecha)
    let edad: number = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes: number = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    if(edad > 0){
      this.edadUsuario = edad
    }
   }

   clearForm(){
    this.edadUsuario = '0'
    this.contacto.reset();
   }

   openSnackBar(message: string) {
    this._snackBar.open(message, 'success', {
      duration: 3000
    });
  }
}
