import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  registerForm !: FormGroup;
  registerUser: any = {};


  ngOnInit() {
    this.createRegisterForm()
  }


  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(18)]],
        confirmPassword: ["", Validators.required],

      },
      {validator : this.passwordMatchValidator}

    )
  }
  
  passwordMatchValidator(g : FormGroup){
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {missMatch:true}
  }

  register(){
    if(this.registerForm.valid){
      this.registerUser = Object.assign({},this.registerForm.value)
      this.authService.register(this.registerUser)
    }
  }

}
