import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OmniviewfrontTestModule } from '../../../test.module';
import { OmniUserComponent } from 'app/entities/omni-user/omni-user.component';
import { OmniUserService } from 'app/entities/omni-user/omni-user.service';
import { OmniUser } from 'app/shared/model/omni-user.model';

describe('Component Tests', () => {
  describe('OmniUser Management Component', () => {
    let comp: OmniUserComponent;
    let fixture: ComponentFixture<OmniUserComponent>;
    let service: OmniUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OmniviewfrontTestModule],
        declarations: [OmniUserComponent]
      })
        .overrideTemplate(OmniUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OmniUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OmniUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OmniUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.omniUsers && comp.omniUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
