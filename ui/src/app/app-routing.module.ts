import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { TodoListsComponent } from 'src/app/todo-lists/todo-lists.component';
import { TodoListItemsComponent } from 'src/app/todo-list-items/todo-list-items.component';

const routes: Routes = [
  { path: '', component: TodoListsComponent },
  { path: 'todo/:todoId', component: TodoListItemsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
