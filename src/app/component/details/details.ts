import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../service/api';
import { SharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-details',
  imports: [SharedImports],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
user: any;

  constructor(private route: ActivatedRoute, private api: Api) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.get().subscribe((data) => {
    this.user = data.find(u => 
      Object.values(u).some(val => String(val) === id)
    );
  });
}
}
