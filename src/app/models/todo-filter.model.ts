/**
 * Todo Filter Types - International Standard
 * 
 * Following international conventions for enum naming and structure
 * Used by enterprises like Google, Microsoft, Facebook for scalable applications
 */

export type TodoFilterType = 'all' | 'active' | 'completed';

export interface TodoFilter {
  type: TodoFilterType;
  label: string;
  count?: number;
}

export const TODO_FILTERS: TodoFilter[] = [
  { type: 'all', label: 'All' },
  { type: 'active', label: 'Active' },
  { type: 'completed', label: 'Completed' }
];

/**
 * Filter utility functions following functional programming principles
 * Used in enterprise applications for maintainable and testable code
 */
export class TodoFilterUtils {
  static getFilterLabel(type: TodoFilterType): string {
    const filter = TODO_FILTERS.find(f => f.type === type);
    return filter?.label || 'All';
  }

  static isValidFilterType(type: string): type is TodoFilterType {
    return ['all', 'active', 'completed'].includes(type);
  }
}