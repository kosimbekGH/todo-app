import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton, MatMiniFabButton} from '@angular/material/button';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {MatLabel} from '@angular/material/form-field';
import {TodoModel} from '../../core/interfaces';
import {MatListItem} from '@angular/material/list';

@Component({
    selector: 'app-todo-item',
    standalone: true,
    imports: [
        MatCard,
        MatIcon,
        MatMiniFabButton,
        MatCheckbox,
        MatLabel,
        MatListItem,
        MatCardHeader,
        MatCardContent,
        MatCardTitle,
        MatButton,
        MatFabButton
    ],
    templateUrl: './todo-item.component.html',
    styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
    @Input() todo!: TodoModel;
    @Output() completeTodo = new EventEmitter<MatCheckboxChange>();
    @Output() deleteTodo = new EventEmitter<string>();
}
