import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOmniUser } from 'app/shared/model/omni-user.model';
import { OmniUserService } from './omni-user.service';

@Component({
  templateUrl: './omni-user-delete-dialog.component.html'
})
export class OmniUserDeleteDialogComponent {
  omniUser?: IOmniUser;

  constructor(protected omniUserService: OmniUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.omniUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('omniUserListModification');
      this.activeModal.close();
    });
  }
}
