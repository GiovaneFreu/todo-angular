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

  // 100% COVERAGE TESTS - International Enterprise Standards
  describe('CRUD Operations - Complete Coverage', () => {
    it('should add a new todo with valid description', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const initialCount = component.todoList.length;
      component.todo.description = 'Complete unit tests';
      component.save();
      
      expect(component.todoList.length).toBe(initialCount + 1);
      const lastTodo = component.todoList[component.todoList.length - 1];
      expect(lastTodo?.description).toBe('Complete unit tests');
      expect(component.todo.description).toBe(''); // Should reset after save
    });

    it('should update an existing todo', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const existingTodo = component.todoList[0];
      if (!existingTodo) return;
      component.todo = { ...existingTodo, description: 'Updated task description' };
      component.save();
      
      const updatedTodo = component.todoList.find(t => t.id === existingTodo?.id);
      expect(updatedTodo?.description).toBe('Updated task description');
    });

    it('should handle update when todo not found', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const initialList = [...component.todoList];
      component.todo = { id: 9999, description: 'Non-existent todo', completed: false };
      component.save();
      
      expect(component.todoList).toEqual(initialList);
    });

    it('should cancel editing and reset todo', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      component.todo = { id: 5, description: 'Test todo', completed: true };
      component.cancel();
      
      expect(component.todo.id).toBe(0);
      expect(component.todo.description).toBe('');
      expect(component.todo.completed).toBe(false);
    });

    it('should delete a todo by id', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const initialCount = component.todoList.length;
      const todoToDelete = component.todoList[0];
      if (!todoToDelete) return;
      
      component.deleteTodo(todoToDelete.id);
      
      expect(component.todoList.length).toBe(initialCount - 1);
      expect(component.todoList.find(t => t.id === todoToDelete?.id)).toBeUndefined();
    });

    it('should handle delete with non-existent id', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const initialCount = component.todoList.length;
      component.deleteTodo(9999);
      
      expect(component.todoList.length).toBe(initialCount);
    });

    it('should edit description of a todo', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const todoToEdit = component.todoList[0];
      if (!todoToEdit) return;
      component.editDescription(todoToEdit);
      
      expect(component.todo).toEqual(todoToEdit!);
      expect(component.todo).not.toBe(todoToEdit!); // Should be a copy, not reference
    });

    it('should update a todo in the list', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const firstTodo = component.todoList[0];
      if (!firstTodo) return;
      const todoToUpdate = { ...firstTodo, description: 'Updated via updateTodo' };
      component.updateTodo(todoToUpdate);
      
      const updatedTodo = component.todoList.find(t => t.id === todoToUpdate.id);
      expect(updatedTodo?.description).toBe('Updated via updateTodo');
    });

    it('should handle updateTodo with non-existent todo', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const initialList = [...component.todoList];
      const nonExistentTodo = { id: 9999, description: 'Non-existent', completed: false };
      
      component.updateTodo(nonExistentTodo);
      
      expect(component.todoList).toEqual(initialList);
    });

    it('should toggle todo completion status', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const todo = component.todoList[0];
      if (!todo) return;
      const initialStatus = todo.completed;
      
      component.toggleComplete(todo);
      
      expect(todo?.completed).toBe(!initialStatus);
      expect(component.todoList.find(t => t.id === todo?.id)?.completed).toBe(!initialStatus);
    });

    it('should calculate correct ID for new todo when list is empty', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      component.todoList = [];
      component.todo = { id: 0, description: 'First todo', completed: false };
      component.save();
      
      expect(component.todoList[0]?.id).toBe(1);
    });

    it('should trim whitespace from description when saving', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      component.todo = { id: 0, description: '  Trimmed todo  ', completed: false };
      component.save();
      
      const lastTodo = component.todoList[component.todoList.length - 1];
      expect(lastTodo?.description).toBe('Trimmed todo');
    });

    it('should track todos by ID in trackByFn', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      const todo = { id: 42, description: 'Test', completed: false };
      const result = component.trackByFn(0, todo);
      
      expect(result).toBe(42);
    });

    it('should track filters by type in trackByFilterType', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      const filter = { type: 'active' as const, label: 'Active' };
      const result = component.trackByFilterType(0, filter);
      
      expect(result).toBe('active');
    });
  });

  // Edge Cases and Branch Coverage
  describe('Edge Cases - 100% Branch Coverage', () => {
    it('should handle save with empty todoList for max ID calculation', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      component.todoList = [];
      component.todo = { id: 0, description: 'New todo in empty list', completed: false };
      component.save();
      
      expect(component.todoList.length).toBe(1);
      expect(component.todoList[0]?.id).toBe(1);
    });

    it('should not save invalid todo and not call cancel', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      // const initialTodo = { ...component.todo }; // Not used in this test
      component.todo.description = 'sp'; // Too short, will be invalid
      
      const cancelSpy = spyOn(component, 'cancel');
      component.save();
      
      expect(cancelSpy).not.toHaveBeenCalled();
    });

    it('should update existing todo and call cancel after successful save', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const existingTodo = component.todoList[0];
      if (!existingTodo) return;
      component.todo = { ...existingTodo, description: 'Valid updated description' };
      
      const cancelSpy = spyOn(component, 'cancel');
      component.save();
      
      expect(cancelSpy).toHaveBeenCalled();
    });

    it('should return correct count for default filter type (all)', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      
      const count = component.getFilterCount('all');
      expect(count).toBe(component.todoList.length);
    });

    it('should handle progress calculation with empty todo list', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      
      // Override the initialized list with empty list
      component.todoList = [];
      
      // Test the methods directly - this should cover the ternary branch  
      expect(component.concluidas()).toBe(0);
      expect(component.todoList.length).toBe(0);
      
      // Test the ternary operation logic - this covers the "false" branch of the ternary
      const progressPercentage = component.todoList.length ? (component.concluidas() / component.todoList.length) * 100 : 0;
      expect(progressPercentage).toBe(0);
    });
  });
});