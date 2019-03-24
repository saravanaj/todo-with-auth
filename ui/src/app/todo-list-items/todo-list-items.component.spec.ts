import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemsComponent } from './todo-list-items.component';

describe('TodoListItemsComponent', () => {
  let component: TodoListItemsComponent;
  let fixture: ComponentFixture<TodoListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
