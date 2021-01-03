import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOmniUser } from 'app/shared/model/omni-user.model';
import { OmniUserService } from './omni-user.service';
import { OmniUserDeleteDialogComponent } from './omni-user-delete-dialog.component';

@Component({
  selector: 'jhi-omni-user',
  templateUrl: './omni-user.component.html'
})
export class OmniUserComponent implements OnInit, OnDestroy {
  omniUsers?: IOmniUser[];
  eventSubscriber?: Subscription;

  constructor(protected omniUserService: OmniUserService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.omniUserService.query().subscribe((res: HttpResponse<IOmniUser[]>) => (this.omniUsers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOmniUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOmniUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOmniUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('omniUserListModification', () => this.loadAll());
  }

  delete(omniUser: IOmniUser): void {
    const modalRef = this.modalService.open(OmniUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.omniUser = omniUser;
  }
}
