import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOmniUser } from 'app/shared/model/omni-user.model';

@Component({
  selector: 'jhi-omni-user-detail',
  templateUrl: './omni-user-detail.component.html'
})
export class OmniUserDetailComponent implements OnInit {
  omniUser: IOmniUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ omniUser }) => (this.omniUser = omniUser));
  }

  previousState(): void {
    window.history.back();
  }
}
