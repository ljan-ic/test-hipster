import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConference } from 'app/shared/model/conference.model';
import { ConferenceService } from './conference.service';
import { ConferenceDeleteDialogComponent } from './conference-delete-dialog.component';

@Component({
  selector: 'jhi-conference',
  templateUrl: './conference.component.html'
})
export class ConferenceComponent implements OnInit, OnDestroy {
  conferences?: IConference[];
  eventSubscriber?: Subscription;

  constructor(
    protected conferenceService: ConferenceService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.conferenceService.query().subscribe((res: HttpResponse<IConference[]>) => (this.conferences = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInConferences();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IConference): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInConferences(): void {
    this.eventSubscriber = this.eventManager.subscribe('conferenceListModification', () => this.loadAll());
  }

  delete(conference: IConference): void {
    const modalRef = this.modalService.open(ConferenceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.conference = conference;
  }
}
