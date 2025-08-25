import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';

describe('ValidationService - TDD Enterprise Standards', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateTodoDescription() - International Standards', () => {
    
    describe('Required field validation', () => {
      it('should reject empty string', () => {
        const result = service.validateTodoDescription('');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Task description is required');
      });

      it('should reject null/undefined values', () => {
        const resultNull = service.validateTodoDescription(null as any);
        const resultUndefined = service.validateTodoDescription(undefined as any);
        
        expect(resultNull.isValid).toBe(false);
        expect(resultUndefined.isValid).toBe(false);
      });

      it('should reject whitespace-only strings', () => {
        const result = service.validateTodoDescription('   ');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Task description is required');
      });
    });

    describe('Length validation', () => {
      it('should reject strings shorter than minimum length', () => {
        const result = service.validateTodoDescription('AB'); // 2 chars, min is 3
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Task description must be at least 3 characters long');
      });

      it('should accept strings at minimum length', () => {
        const result = service.validateTodoDescription('ABC'); // exactly 3 chars
        
        expect(result.isValid).toBe(true);
        expect(result.errors).not.toContain('Task description must be at least 3 characters long');
      });

      it('should reject strings longer than maximum length', () => {
        const longString = 'A'.repeat(101); // 101 chars, max is 100
        const result = service.validateTodoDescription(longString);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Task description cannot exceed 100 characters');
      });

      it('should accept strings at maximum length', () => {
        const maxString = 'A'.repeat(100); // exactly 100 chars
        const result = service.validateTodoDescription(maxString);
        
        expect(result.isValid).toBe(true);
        expect(result.errors).not.toContain('Task description cannot exceed 100 characters');
      });
    });

    describe('Pattern validation', () => {
      it('should reject strings with invalid special characters', () => {
        const result = service.validateTodoDescription('Task with @ # $ % symbols');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Task description contains invalid characters');
      });

      it('should accept strings with allowed characters', () => {
        const result = service.validateTodoDescription('Buy groceries - milk, bread, eggs (urgent)!');
        
        expect(result.isValid).toBe(true);
        expect(result.errors).not.toContain('Task description contains invalid characters');
      });
    });

    describe('Prohibited words validation', () => {
      it('should reject descriptions containing prohibited words', () => {
        const result = service.validateTodoDescription('This is spam content');
        
        expect(result.isValid).toBe(false);
        expect(result.errors[0]).toContain('prohibited words');
        expect(result.errors[0]).toContain('spam');
      });

      it('should be case-insensitive for prohibited words', () => {
        const result = service.validateTodoDescription('This is SPAM content');
        
        expect(result.isValid).toBe(false);
        expect(result.errors[0]).toContain('prohibited words');
      });

      it('should accept descriptions without prohibited words', () => {
        const result = service.validateTodoDescription('Buy healthy food for dinner');
        
        expect(result.isValid).toBe(true);
        expect(result.errors.length).toBe(0);
      });
    });

    describe('Custom rules', () => {
      it('should accept custom validation rules', () => {
        const customRules = { minLength: 5, maxLength: 50 };
        const result = service.validateTodoDescription('Test', customRules);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Task description must be at least 5 characters long');
      });
    });

    describe('Valid descriptions', () => {
      it('should accept valid task descriptions', () => {
        const validDescriptions = [
          'Buy groceries for the week',
          'Call dentist for appointment',
          'Finish project documentation',
          'Exercise for 30 minutes'
        ];

        validDescriptions.forEach(desc => {
          const result = service.validateTodoDescription(desc);
          expect(result.isValid).toBe(true);
          expect(result.errors.length).toBe(0);
        });
      });
    });
  });

  describe('getValidationState() - UI Feedback', () => {
    it('should detect empty state', () => {
      const state = service.getValidationState('');
      
      expect(state.isEmpty).toBe(true);
      expect(state.characterCount).toBe(0);
    });

    it('should detect too short state', () => {
      const state = service.getValidationState('AB');
      
      expect(state.isTooShort).toBe(true);
      expect(state.characterCount).toBe(2);
    });

    it('should detect too long state', () => {
      const longString = 'A'.repeat(101);
      const state = service.getValidationState(longString);
      
      expect(state.isTooLong).toBe(true);
      expect(state.characterCount).toBe(101);
      expect(state.characterLimit).toBe(100);
    });

    it('should detect invalid characters', () => {
      const state = service.getValidationState('Task @ # $');
      
      expect(state.hasInvalidChars).toBe(true);
    });

    it('should detect prohibited words', () => {
      const state = service.getValidationState('This is spam');
      
      expect(state.hasProhibitedWords).toBe(true);
    });

    it('should provide character count information', () => {
      const state = service.getValidationState('Valid task description');
      
      expect(state.characterCount).toBe(22); // "Valid task description" = 22 characters
      expect(state.characterLimit).toBe(100);
    });

    it('should handle validation without required pattern (undefined pattern)', () => {
      const customRules = { requiredPattern: undefined };
      const result = service.validateTodoDescription('Valid description', customRules);
      const state = service.getValidationState('Valid description');
      
      expect(result.isValid).toBe(true);
      expect(state.hasInvalidChars).toBe(false);
    });
  });
});