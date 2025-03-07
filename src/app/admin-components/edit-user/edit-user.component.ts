import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/admin-user-dashboard-services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      user_type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(userId).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  // ngOnInit(): void {
  //     this.user$ = this.route.paramMap.pipe(
  //       switchMap(params => {
  //         const id = +params.get('id')!;
  //         return this.userService.getUserById(id);
  //       })
  //     );
  //   }

  updateUser(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value).subscribe(updatedUser => {
        alert('Usuario actualizado');
        this.router.navigate(['/admin/user']);
      });
    } else {
      alert('Por favor, rellena todos los campos correctamente.');
    }
  }
}
