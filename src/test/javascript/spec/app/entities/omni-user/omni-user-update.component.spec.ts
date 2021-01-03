import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OmniviewfrontTestModule } from '../../../test.module';
import { OmniUserUpdateComponent } from 'app/entities/omni-user/omni-user-update.component';
import { OmniUserService } from 'app/entities/omni-user/omni-user.service';
import { OmniUser } from 'app/shared/model/omni-user.model';

describe('Component Tests', () => {
  describe('OmniUser Management Update Component', () => {
    let comp: OmniUserUpdateComponent;
    let fixture: ComponentFixture<OmniUserUpdateComponent>;
    let service: OmniUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OmniviewfrontTestModule],
        declarations: [OmniUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OmniUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OmniUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OmniUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OmniUser(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OmniUser();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
