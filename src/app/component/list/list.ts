import { Component } from '@angular/core';
import { Api } from '../../service/api';
import { Router } from '@angular/router';
import { SharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-list',
  imports: [SharedImports],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  users: any[] = [];
  headers: string[] = [];

  constructor(private api: Api, private router: Router) { }

  ngOnInit() {
    this.api.get().subscribe((data) => {
      this.users = data.map(u => ({ ...u, isEditing: false }));
      if (data.length > 0) {
        this.headers = Object.keys(data[0]);
      }
    });
  }

  goToDetails(user: any) {
    const isExist = this.headers.find(ele => ele.toLowerCase() === 'id');
    const key = isExist ? isExist : this.headers[0];
    this.router.navigate(['/details', user[key]]);
  }

  enableEdit(user: any, event: MouseEvent) {
    event.stopPropagation();
    this.users.forEach(u => u.isEditing = false);
    user.isEditing = true;
  }

  isEditing(user: any): boolean {
    return user.isEditing === true;
  }

  saveRow(user: any, event: MouseEvent) {
    event.stopPropagation();
    user.isEditing = false;
    console.log("Saving full user row:", user);
  }
}

