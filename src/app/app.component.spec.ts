import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent - TDD Debug', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have initial todo list', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    expect(app.todoList).toBeDefined();
    expect(app.todoList.length).toBeGreaterThan(0);
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Test específico para encontrar o problema
    console.log('HTML content:', compiled.innerHTML.substring(0, 200));
    expect(compiled.textContent).toContain('TodoPro');
  });

  it('should have form elements', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const input = compiled.querySelector('input[name="descricao"]');
    const button = compiled.querySelector('button[type="submit"]');
    
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });
});