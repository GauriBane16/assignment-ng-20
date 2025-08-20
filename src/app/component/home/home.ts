import { Component } from '@angular/core';
import { SharedImports } from '../../shared/shared-imports';
import { Router } from '@angular/router';
import { Api } from '../../service/api';
import { EditableCell } from '../../shared/editable-cell';

@Component({
  selector: 'app-home',
  imports: [...SharedImports, EditableCell],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  users: any[] = [];
  headers: string[] = [];
  editingCellCount = 0;

  constructor(private api: Api, private router: Router) { }

  ngOnInit() {
    this.api.get().subscribe((data) => {
      this.users = data.map(u => ({ ...u, isEditing: false }));
      if (data.length > 0) {
        this.headers = Object.keys(data[0]);
      }
    });
  }

  onRowClick(user: any, event: MouseEvent) {
   event.stopPropagation();
  // cancel any pending single-click edit
  const cell = (event.target as HTMLElement).closest('[appEditableCell]');
  if (cell) {
    const ng = (cell as any).__ngContext__?.[8];
    if (ng?.cancelClick) ng.cancelClick();
  }

  console.log("Navigate to details for:", user);

  this.goToDetails(user);
}

  onCellEditingChange(editing: boolean) {
    if (editing) {
      this.editingCellCount++;
    } else if (this.editingCellCount > 0) {
      this.editingCellCount--;
    }

  }

  goToDetails(user: any) {
    this.router.navigate(['/details', user.id]);
  }

  save(user: any, field: string) {
    console.log('Saving', field, 'for user', user);
  }
}
