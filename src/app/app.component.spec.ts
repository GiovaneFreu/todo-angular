import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent - TDD International Standards', () => {
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
    
    const input = compiled.querySelector('input[name="description"]');
    const button = compiled.querySelector('button[type="submit"]');
    
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  // TDD GREEN PHASE - Filter tests now passing
  describe('Filter Functionality - TDD Implementation', () => {
    it('should have currentFilter property with default "all"', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      expect(component.currentFilter).toBe('all');
    });

    it('should have filteredTodos getter that returns all todos by default', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      expect(component.filteredTodos).toBeDefined();
      expect(component.filteredTodos.length).toBe(component.todoList.length);
    });

    it('should filter active todos when currentFilter is "active"', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      component.currentFilter = 'active';
      
      const activeTodos = component.todoList.filter(t => !t.completed);
      expect(component.filteredTodos.length).toBe(activeTodos.length);
    });

    it('should filter completed todos when currentFilter is "completed"', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      component.currentFilter = 'completed';
      
      const completedTodos = component.todoList.filter(t => t.completed);
      expect(component.filteredTodos.length).toBe(completedTodos.length);
    });

    it('should have setFilter method to change current filter', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      component.setFilter('active');
      expect(component.currentFilter).toBe('active');
      
      component.setFilter('completed');
      expect(component.currentFilter).toBe('completed');
    });

    it('should display filter buttons in template', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      
      const filterButtons = compiled.querySelectorAll('[data-testid^="filter-"]');
      expect(filterButtons.length).toBe(3); // all, active, completed
    });

    it('should show correct active filter button styling', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const allButton = compiled.querySelector('[data-testid="filter-all"]');
      
      expect(allButton).toHaveClass('bg-blue-600'); // Active styling
    });
  });

  // TDD RED PHASE - Validation tests will fail initially  
  describe('Form Validation - TDD Implementation', () => {
    it('should have validation service injected', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      expect(component.validationService).toBeTruthy();
    });

    it('should validate todo description before saving', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges(); // This triggers ngOnInit which initializes sample data
      
      const initialCount = component.todoList.length; // Get current count
      component.todo.description = 'AB'; // Too short
      component.save();
      
      // Should not add invalid todo to the list (count should remain unchanged)
      expect(component.todoList.length).toBe(initialCount);
    });

    it('should show validation errors in template', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      // Set invalid input directly on component
      component.todo.description = 'AB'; // Too short
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const errorElement = compiled.querySelector('[data-testid="validation-error"]');
      expect(errorElement).toBeTruthy();
    });

    it('should show character count feedback', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const characterCounter = compiled.querySelector('[data-testid="character-counter"]');
      
      expect(characterCounter).toBeTruthy();
      expect(characterCounter?.textContent).toContain('0/100');
    });

    it('should disable submit button for invalid input', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      component.todo.description = 'AB'; // Invalid: too short
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement as HTMLElement;
      const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
      
      expect(submitButton.disabled).toBe(true);
    });

    it('should show real-time validation state', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      component.todo.description = 'This is spam content';
      
      const validationState = component.getValidationState();
      expect(validationState.hasProhibitedWords).toBe(true);
    });

    it('should prevent saving todos with validation errors', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      const initialCount = component.todoList.length;
      component.todo.description = ''; // Invalid: empty
      component.save();
      
      expect(component.todoList.length).toBe(initialCount);
    });
  });
});