import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {TodoFormComponent} from '../todo-form/todo-form.component';
import {MatList} from '@angular/material/list';
import {NgForOf} from '@angular/common';
import {TodoModel} from '../../core/interfaces';
import {ReactiveFormsModule} from '@angular/forms';
import {TodoService} from '../../core/services';
import {MatFormField} from '@angular/material/form-field';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Subject, takeUntil} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-todos',
    standalone: true,
    imports: [
        TodoItemComponent,
        TodoFormComponent,
        MatList,
        NgForOf,
        ReactiveFormsModule,
        MatFormField,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatButton,
        MatCardTitle
    ],
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit, OnDestroy {
    todos: TodoModel[] = [];

    private _destroy$ = new Subject<void>();
    private _todoService = inject(TodoService);
    private _snackBar = inject(MatSnackBar);

    ngOnInit(): void {
        // this.retrieveTodos();
        this.todos = [
            {
                id: '1',
                completed: false,
                title: 'First Todo',
                user: 1
            },
            {
                id: '2',
                completed: true,
                title: 'Second Todo',
                user: 1
            }
        ]
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    retrieveTodos(): void {
        this._todoService.retrieveTodos()
            .pipe(takeUntil(this._destroy$))
            .subscribe({
                next: (todos: TodoModel[]) => {
                    this.todos = todos;
                },
                error: () => {
                    this._snackBar.open('Failed to load todos. Please try again.', 'Close', {duration: 3000});
                }
            });
    }

    addTodo(newTodo: TodoModel): void {
        this.todos.push(newTodo);
    }

    completeTodo(checked: boolean, todo: TodoModel): void {
        const updatedTodo = {
            ...todo,
            completed: checked
        };
        this._todoService.updateTodo(todo.id, updatedTodo)
            .pipe(takeUntil(this._destroy$))
            .subscribe({
                next: (res: TodoModel) => {
                    const index = this.todos.findIndex(t => t.id === res.id);
                    if (index !== -1) {
                        this.todos[index] = res;
                    }
                },
                error: () => {
                    this._snackBar.open('Failed to update todo. Please try again.', 'Close', {duration: 3000});
                }
            });
    }

    deleteTodo(id: string): void {
        this._todoService.removeTodo(id)
            .pipe(takeUntil(this._destroy$))
            .subscribe({
                next: () => {
                    this.todos = this.todos.filter(todo => todo.id !== id);
                    this._snackBar.open('Todo deleted successfully', 'Close', {duration: 3000});
                },
                error: () => {
                    this._snackBar.open('Failed to delete todo. Please try again.', 'Close', {duration: 3000});
                }
            });
    }
}
