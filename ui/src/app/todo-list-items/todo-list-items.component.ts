import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-items',
  templateUrl: './todo-list-items.component.html',
  styleUrls: ['./todo-list-items.component.css']
})
export class TodoListItemsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private commonService: CommonService) { }

  private todo : any = {
    listItems: []
  };

  successMessage = '';

  ngOnInit() {
    const todoId = this.route.snapshot.params['todoId'];
    if (todoId) {
      this.commonService.get(`todo/${todoId}`)
        .subscribe((todo) => {
          this.todo = todo;
        });
    }

  }

  backToList() {
    this.router.navigate(['']);
  }

  addListItem(listItem) {
    if (!listItem.value || !listItem.value .trim()) {
      return;
    }
    this.todo.listItems.push({
      listItemName: listItem.value,
      isCompleted: false
    });
    listItem.value = "";
  }
  deleteListItem(item) {
    const index = this.todo.listItems.indexOf(item);
    if (index > -1) {
      this.todo.listItems.splice(index, 1);
    }
  }

  saveListItems() {
    this.commonService.post('todo', this.todo).subscribe(success => {
      this.successMessage = "List items saved successfully";
    });
  }
}
