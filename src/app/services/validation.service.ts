/**
 * Validation Service - International Enterprise Standards
 * 
 * Following industry best practices for form validation
 * Used by companies like Google, Microsoft, Atlassian for scalable applications
 */

import { Injectable } from '@angular/core';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface TodoValidationRules {
  minLength: number;
  maxLength: number;
  prohibitedWords: string[];
  requiredPattern?: RegExp;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private readonly DEFAULT_RULES: TodoValidationRules = {
    minLength: 3,
    maxLength: 100,
    prohibitedWords: ['spam', 'test123', 'todo123'],
    requiredPattern: /^[a-zA-Z0-9\s\-_.,!?()]+$/
  };

  /**
   * Validates todo description according to international standards
   * @param description - Todo description to validate
   * @param customRules - Optional custom validation rules
   * @returns ValidationResult with isValid flag and error messages
   */
  validateTodoDescription(description: string, customRules?: Partial<TodoValidationRules>): ValidationResult {
    const rules = { ...this.DEFAULT_RULES, ...customRules };
    const errors: string[] = [];

    // Trim whitespace for validation
    const trimmedDesc = description?.trim() || '';

    // Required field validation
    if (!trimmedDesc) {
      errors.push('Task description is required');
      return { isValid: false, errors };
    }

    // Minimum length validation
    if (trimmedDesc.length < rules.minLength) {
      errors.push(`Task description must be at least ${rules.minLength} characters long`);
    }

    // Maximum length validation
    if (trimmedDesc.length > rules.maxLength) {
      errors.push(`Task description cannot exceed ${rules.maxLength} characters`);
    }

    // Pattern validation
    if (rules.requiredPattern && !rules.requiredPattern.test(trimmedDesc)) {
      errors.push('Task description contains invalid characters');
    }

    // Prohibited words validation
    const lowerDesc = trimmedDesc.toLowerCase();
    const foundProhibitedWords = rules.prohibitedWords.filter(word => 
      lowerDesc.includes(word.toLowerCase())
    );
    
    if (foundProhibitedWords.length > 0) {
      errors.push(`Task description cannot contain prohibited words: ${foundProhibitedWords.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Gets real-time validation state for UI feedback
   * @param description - Current description being typed
   * @returns Object with validation state for UI rendering
   */
  getValidationState(description: string): {
    isEmpty: boolean;
    isTooShort: boolean;
    isTooLong: boolean;
    hasInvalidChars: boolean;
    hasProhibitedWords: boolean;
    characterCount: number;
    characterLimit: number;
  } {
    const trimmedDesc = description?.trim() || '';
    const rules = this.DEFAULT_RULES;

    return {
      isEmpty: !trimmedDesc,
      isTooShort: trimmedDesc.length > 0 && trimmedDesc.length < rules.minLength,
      isTooLong: trimmedDesc.length > rules.maxLength,
      hasInvalidChars: rules.requiredPattern ? !rules.requiredPattern.test(trimmedDesc) : false,
      hasProhibitedWords: rules.prohibitedWords.some(word => 
        trimmedDesc.toLowerCase().includes(word.toLowerCase())
      ),
      characterCount: trimmedDesc.length,
      characterLimit: rules.maxLength
    };
  }
}