import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})

export class UserFormComponent implements OnInit {
  user: User = { id: 0, first_name: '', last_name: '', user_type: '', email: '', password: '' };
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private route: ActivatedRoute, 
    private router: Router) 
    {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      user_type: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.userService.addUser(newUser).subscribe(() => {
        this.router.navigate(['/admin/user']);
      });
    }
  }
}