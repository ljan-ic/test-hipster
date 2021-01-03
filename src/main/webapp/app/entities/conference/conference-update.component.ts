import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IConference, Conference } from 'app/shared/model/conference.model';
import { ConferenceService } from './conference.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-conference-update',
  templateUrl: './conference-update.component.html'
})
export class ConferenceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    thumbnail: [null, [Validators.required]],
    thumbnailContentType: [],
    startDateTime: [null, [Validators.required]],
    expectedEndDateTime: [null, [Validators.required]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected conferenceService: ConferenceService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conference }) => {
      if (!conference.id) {
        const today = moment().startOf('day');
        conference.startDateTime = today;
        conference.expectedEndDateTime = today;
      }

      this.updateForm(conference);
    });
  }

  updateForm(conference: IConference): void {
    this.editForm.patchValue({
      id: conference.id,
      name: conference.name,
      thumbnail: conference.thumbnail,
      thumbnailContentType: conference.thumbnailContentType,
      startDateTime: conference.startDateTime ? conference.startDateTime.format(DATE_TIME_FORMAT) : null,
      expectedEndDateTime: conference.expectedEndDateTime ? conference.expectedEndDateTime.format(DATE_TIME_FORMAT) : null,
      description: conference.description,
      price: conference.price
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('omniviewfrontApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const conference = this.createFromForm();
    if (conference.id !== undefined) {
      this.subscribeToSaveResponse(this.conferenceService.update(conference));
    } else {
      this.subscribeToSaveResponse(this.conferenceService.create(conference));
    }
  }

  private createFromForm(): IConference {
    return {
      ...new Conference(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      thumbnailContentType: this.editForm.get(['thumbnailContentType'])!.value,
      thumbnail: this.editForm.get(['thumbnail'])!.value,
      startDateTime: this.editForm.get(['startDateTime'])!.value
        ? moment(this.editForm.get(['startDateTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      expectedEndDateTime: this.editForm.get(['expectedEndDateTime'])!.value
        ? moment(this.editForm.get(['expectedEndDateTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      description: this.editForm.get(['description'])!.value,
      price: this.editForm.get(['price'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConference>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
