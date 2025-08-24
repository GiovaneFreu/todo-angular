import { TodoFilterUtils, TODO_FILTERS, TodoFilterType } from './todo-filter.model';

describe('TodoFilterModel - International Standards', () => {
  
  describe('TODO_FILTERS constant', () => {
    it('should have exactly 3 filter options', () => {
      expect(TODO_FILTERS).toHaveSize(3);
    });

    it('should contain all required filter types', () => {
      const types = TODO_FILTERS.map(f => f.type);
      expect(types).toContain('all');
      expect(types).toContain('active');
      expect(types).toContain('completed');
    });

    it('should have proper English labels for international use', () => {
      const allFilter = TODO_FILTERS.find(f => f.type === 'all');
      const activeFilter = TODO_FILTERS.find(f => f.type === 'active');
      const completedFilter = TODO_FILTERS.find(f => f.type === 'completed');

      expect(allFilter?.label).toBe('All');
      expect(activeFilter?.label).toBe('Active');
      expect(completedFilter?.label).toBe('Completed');
    });
  });

  describe('TodoFilterUtils.getFilterLabel()', () => {
    it('should return correct label for valid filter types', () => {
      expect(TodoFilterUtils.getFilterLabel('all')).toBe('All');
      expect(TodoFilterUtils.getFilterLabel('active')).toBe('Active');
      expect(TodoFilterUtils.getFilterLabel('completed')).toBe('Completed');
    });

    it('should return default "All" for invalid filter type', () => {
      // TypeScript prevents this at compile time, but testing runtime safety
      expect(TodoFilterUtils.getFilterLabel('invalid' as TodoFilterType)).toBe('All');
    });
  });

  describe('TodoFilterUtils.isValidFilterType()', () => {
    it('should return true for valid filter types', () => {
      expect(TodoFilterUtils.isValidFilterType('all')).toBe(true);
      expect(TodoFilterUtils.isValidFilterType('active')).toBe(true);
      expect(TodoFilterUtils.isValidFilterType('completed')).toBe(true);
    });

    it('should return false for invalid filter types', () => {
      expect(TodoFilterUtils.isValidFilterType('invalid')).toBe(false);
      expect(TodoFilterUtils.isValidFilterType('')).toBe(false);
      expect(TodoFilterUtils.isValidFilterType('ALL')).toBe(false); // Case sensitive
    });
  });
});