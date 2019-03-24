import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.css']
})
export class TodoListsComponent implements OnInit {

  constructor(private commonService: CommonService, private formBuilder: FormBuilder) { }

  todoLists: any;
  addListForm: FormGroup
  submitted = false;

  ngOnInit() {
    this.addListForm = this.formBuilder.group({
      listName: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+$/i), Validators.minLength(8)]],
    });
    this.getTodoLists();

  }
  get f() { return this.addListForm.controls; }

  addList() {
    this.submitted = true;
    this.commonService.post("todo", this.addListForm.getRawValue())
      .subscribe(success => {
        this.addListForm.reset();
        this.submitted = false;
        this.getTodoLists();
      })
  }
  deleteList(todoId) {
    this.commonService.del(`todo/${todoId}`).subscribe(success => {
      this.getTodoLists();
    });
  }

  getTodoLists() {
    this.commonService.get("todo")
      .subscribe(todoLists => {
        this.todoLists = todoLists;
      });
  }

}
