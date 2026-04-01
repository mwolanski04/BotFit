import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import WorkoutPlan from '../WorkoutPlan';

// useNavigate is a hook that needs to be mocked
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper to render with router context (required since useNavigate is used)
const renderWorkoutPlan = () => render(
  <MemoryRouter>
    <WorkoutPlan />
  </MemoryRouter>
);

// Clear mock call history between tests
beforeEach(() => {
  mockNavigate.mockClear();
});

// --- Rendering Tests ---

test('renders the main heading', () => {
  renderWorkoutPlan();
  expect(screen.getByText('Your Workout Plan')).toBeInTheDocument();
});

test('renders the table headers properly', () => {
  renderWorkoutPlan();
  expect(screen.getByText('Exercise')).toBeInTheDocument();
  expect(screen.getByText('Sets')).toBeInTheDocument();
  expect(screen.getByText('Repetitions/Duration')).toBeInTheDocument();
  expect(screen.getByText('Tutorial')).toBeInTheDocument();
});

test('renders at least one exercise in the table', () => {
  renderWorkoutPlan();
  const rows = screen.getAllByRole('row');
  expect(rows.length - 1).toBeGreaterThanOrEqual(1);
});

test('renders all columns for each exercise', () => {
  renderWorkoutPlan();
  const exercises = screen.getAllByRole('row').slice(1);
  exercises.forEach(exercise => {
    const cells = within(exercise).getAllByRole('cell');
    cells.forEach(cell => {
      expect(cell).not.toBeEmptyDOMElement();
    })
  });
});

test('renders the Update Workout Plan button', () => {
  renderWorkoutPlan();
  expect(screen.getByRole('button', { name: /update workout plan/i })).toBeInTheDocument();
});

// --- Tutorial Link Tests ---

test('renders at least one tutorial link', () => {
  renderWorkoutPlan();
  const links = screen.getAllByText('Watch a tutorial');
  expect(links.length).toBeGreaterThanOrEqual(1);
});

test('tutorial links open in a new tab', () => {
  renderWorkoutPlan();
  const links = screen.getAllByRole('link', { name: /watch a tutorial/i });
  links.forEach(link => {
    expect(link).toHaveAttribute('target', '_blank');
  });
});

test('tutorial links have rel="noopener noreferrer" for security', () => {
  renderWorkoutPlan();
  const links = screen.getAllByRole('link', { name: /watch a tutorial/i });
  links.forEach(link => {
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

// --- Interaction Tests ---

test('clicking Update Workout Plan navigates to /WorkoutPlanForm', async () => {
  const user = userEvent.setup();
  renderWorkoutPlan();
  await user.click(screen.getByRole('button', { name: /update workout plan/i }));
  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith('/WorkoutPlanForm');
});