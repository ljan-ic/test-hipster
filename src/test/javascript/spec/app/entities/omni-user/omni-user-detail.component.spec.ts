import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OmniviewfrontTestModule } from '../../../test.module';
import { OmniUserDetailComponent } from 'app/entities/omni-user/omni-user-detail.component';
import { OmniUser } from 'app/shared/model/omni-user.model';

describe('Component Tests', () => {
  describe('OmniUser Management Detail Component', () => {
    let comp: OmniUserDetailComponent;
    let fixture: ComponentFixture<OmniUserDetailComponent>;
    const route = ({ data: of({ omniUser: new OmniUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OmniviewfrontTestModule],
        declarations: [OmniUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OmniUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OmniUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load omniUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.omniUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
