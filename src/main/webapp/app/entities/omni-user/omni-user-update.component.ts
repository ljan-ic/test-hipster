import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOmniUser, OmniUser } from 'app/shared/model/omni-user.model';
import { OmniUserService } from './omni-user.service';

@Component({
  selector: 'jhi-omni-user-update',
  templateUrl: './omni-user-update.component.html'
})
export class OmniUserUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    email: [null, [Validators.required, Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+')]],
    password: [null, [Validators.required]],
    name: [null, [Validators.required, Validators.maxLength(30)]],
    surname: [null, [Validators.required, Validators.maxLength(30)]],
    about: [null, [Validators.maxLength(500)]]
  });

  constructor(protected omniUserService: OmniUserService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ omniUser }) => {
      this.updateForm(omniUser);
    });
  }

  updateForm(omniUser: IOmniUser): void {
    this.editForm.patchValue({
      id: omniUser.id,
      email: omniUser.email,
      password: omniUser.password,
      name: omniUser.name,
      surname: omniUser.surname,
      about: omniUser.about
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const omniUser = this.createFromForm();
    if (omniUser.id !== undefined) {
      this.subscribeToSaveResponse(this.omniUserService.update(omniUser));
    } else {
      this.subscribeToSaveResponse(this.omniUserService.create(omniUser));
    }
  }

  private createFromForm(): IOmniUser {
    return {
      ...new OmniUser(),
      id: this.editForm.get(['id'])!.value,
      email: this.editForm.get(['email'])!.value,
      password: this.editForm.get(['password'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      about: this.editForm.get(['about'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOmniUser>>): void {
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
