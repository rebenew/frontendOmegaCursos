import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/admin-user-dashboard-services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})

export class UserFormComponent implements OnInit {
  user: User = { id: 0, first_name: '', last_name: '', user_type: '', email: '', password: '' };
  userForm: FormGroup;

  constructor(
    @Inject(UserService)
    private userService: UserService,
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router) 
    {
    
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      user_type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  createUser(): void {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(newUser => {
        alert('Usuario creado con éxito');
        this.router.navigate(['/admin/user']);
      });
    } else {
      alert('Por favor, rellena todos los campos correctamente.');
    }
  }
}