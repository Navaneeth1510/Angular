import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatintComponent } from './chatint.component';

describe('ChatintComponent', () => {
  let component: ChatintComponent;
  let fixture: ComponentFixture<ChatintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
