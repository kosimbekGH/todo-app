import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import {Subject, takeUntil} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatError,
        MatButton,
        MatFormField,
        MatCardTitle,
        MatCardContent,
        MatCard,
        MatCardHeader,
        MatInput,
        MatLabel,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
    formGroup!: FormGroup;

    private _destroy$ = new Subject<void>();

    private _formBuilder = inject(FormBuilder);
    private _authService = inject(AuthService);
    private _router = inject(Router);
    private _snackBar = inject(MatSnackBar);

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    ngOnInit(): void {
        this._createForms();
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            const {email, password} = this.formGroup.value;
            this._authService.login(email, password)
                .pipe(takeUntil(this._destroy$))
                .subscribe({
                    next: () => {
                        this._router.navigate(['/todos']);
                    },
                    error: (error) => {
                        console.error('Login failed', error);
                        this._snackBar.open('Login failed. Please try again.', 'Close', {duration: 3000});
                    }
                });
        } else {
            this.formGroup.markAllAsTouched();
        }
    }

    private _createForms(): void {
        this.formGroup = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
}
