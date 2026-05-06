import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MealPlan from '../MealPlan';

// useNavigate is a hook that needs to be mocked
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper to render with router context (required since useNavigate is used)
const renderMealPlan = () => render(
  <MemoryRouter>
    <MealPlan />
  </MemoryRouter>
);

// Clear mock call history between tests
beforeEach(() => {
  mockNavigate.mockClear();
});

// --- Rendering Tests ---

test('renders the main heading', () => {
  renderMealPlan();
  expect(screen.getByText('Your Meal Plan')).toBeInTheDocument();
});

test('renders the table headers properly', () => {
  renderMealPlan();
  expect(screen.getByText('Time of Day')).toBeInTheDocument();
  expect(screen.getByText('Meal')).toBeInTheDocument();
  expect(screen.getByText('Link')).toBeInTheDocument();
});

test('renders at least one meal in the table', () => {
  renderMealPlan();
  const rows = screen.getAllByRole('row');
  expect(rows.length - 1).toBeGreaterThanOrEqual(1);
});

test('renders all columns for each meal', () => {
  renderMealPlan();
  const meals = screen.getAllByRole('row').slice(1);
  meals.forEach(meal => {
    const cells = within(meal).getAllByRole('cell');
    cells.forEach(cell => {
      expect(cell).not.toBeEmptyDOMElement();
    })
  });
});

test('renders the Update Meal Plan button', () => {
  renderMealPlan();
  expect(screen.getByRole('button', { name: /update meal plan/i })).toBeInTheDocument();
});

// --- Tutorial Link Tests ---

test('renders at least one recipe link', () => {
  renderMealPlan();
  const links = screen.getAllByText('View a recommended recipe');
  expect(links.length).toBeGreaterThanOrEqual(1);
});

test('tutorial links open in a new tab', () => {
  renderMealPlan();
  const links = screen.getAllByRole('link', { name: /view a recommended recipe/i });
  links.forEach(link => {
    expect(link).toHaveAttribute('target', '_blank');
  });
});

test('tutorial links have rel="noopener noreferrer" for security', () => {
  renderMealPlan();
  const links = screen.getAllByRole('link', { name: /view a recommended recipe/i });
  links.forEach(link => {
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

// --- Interaction Tests ---

test('clicking Update Meal Plan navigates to /MealPlanForm', async () => {
  const user = userEvent.setup();
  renderMealPlan();
  await user.click(screen.getByRole('button', { name: /update meal plan/i }));
  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith('/MealPlanForm');
});