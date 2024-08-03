import {Component, EventEmitter, inject, OnDestroy, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {TodoModel} from '../../core/interfaces';
import {MatCheckbox} from '@angular/material/checkbox';
import {TodoService} from '../../core/services';
import {Subject, takeUntil} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-todo-form',
    standalone: true,
    imports: [
        FormsModule,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatIcon,
        MatMiniFabButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatCheckbox
    ],
    templateUrl: './todo-form.component.html',
    styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent implements OnDestroy {
    @Output() newTodo = new EventEmitter<TodoModel>();

    todoFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
    ]);

    private _todoService = inject(TodoService);
    private _snackBar = inject(MatSnackBar);
    private _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    addNewTodo(): void {
        if (this.todoFormControl.invalid || !this.todoFormControl.value?.trim()) {
            return;
        }

        const title = this.todoFormControl.value || '';
        const newTodo: Omit<TodoModel, 'id'> = {
            user: 1,
            title,
            completed: false
        };

        this._todoService.createTodo(newTodo)
            .pipe(takeUntil(this._destroy$))
            .subscribe({
                next: (createdTodo: TodoModel) => {
                    this.newTodo.emit(createdTodo);
                    this.todoFormControl.reset();
                    this._snackBar.open('Login failed. Please try again.', 'Close', {
                        duration: 5000,
                        panelClass: ['error-snackbar']
                    });
                    this._snackBar.open('Todo added successfully', 'Close', {duration: 3000});
                },
                error: (error) => {
                    console.error('Error adding todo:', error);
                    this._snackBar.open('Error adding todo. Please try again.', 'Close', {duration: 12312323});
                }
            });
    }
}
