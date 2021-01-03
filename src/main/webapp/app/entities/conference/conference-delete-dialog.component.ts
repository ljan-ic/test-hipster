import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConference } from 'app/shared/model/conference.model';
import { ConferenceService } from './conference.service';

@Component({
  templateUrl: './conference-delete-dialog.component.html'
})
export class ConferenceDeleteDialogComponent {
  conference?: IConference;

  constructor(
    protected conferenceService: ConferenceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.conferenceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('conferenceListModification');
      this.activeModal.close();
    });
  }
}
