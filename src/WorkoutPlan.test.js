import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import WorkoutPlan from './WorkoutPlan';

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

test('renders the day and workout focus subheader', () => {
  renderWorkoutPlan();
  expect(screen.getByText('Monday - Full Body Strength')).toBeInTheDocument();
});

test('renders all four table column headers', () => {
  renderWorkoutPlan();
  expect(screen.getByText('Exercise')).toBeInTheDocument();
  expect(screen.getByText('Sets')).toBeInTheDocument();
  expect(screen.getByText('Repetitions/Duration')).toBeInTheDocument();
  expect(screen.getByText('Tutorial')).toBeInTheDocument();
});

test('renders all three exercises', () => {
  renderWorkoutPlan();
  expect(screen.getByText('Pushups')).toBeInTheDocument();
  expect(screen.getByText('Squats')).toBeInTheDocument();
  expect(screen.getByText('Planks')).toBeInTheDocument();
});

test('renders correct sets and reps for each exercise', () => {
  renderWorkoutPlan();

  // Pushups: 5 sets, 10 reps
  expect(screen.getByText('10')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();

  // Squats: 3 sets, 15 reps
  expect(screen.getByText('15')).toBeInTheDocument();

  // Planks: 30 seconds duration
  expect(screen.getByText('30 seconds')).toBeInTheDocument();
});

test('renders the correct number of table rows (1 header + 3 data rows)', () => {
  renderWorkoutPlan();
  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(4);
});

test('renders the Update Workout Plan button', () => {
  renderWorkoutPlan();
  expect(screen.getByRole('button', { name: /update workout plan/i })).toBeInTheDocument();
});


// --- Tutorial Link Tests ---

test('renders three tutorial links', () => {
  renderWorkoutPlan();
  const links = screen.getAllByText('Watch a tutorial');
  expect(links).toHaveLength(3);
});

test('tutorial links point to the correct URLs', () => {
  renderWorkoutPlan();
  const links = screen.getAllByRole('link', { name: /watch a tutorial/i });

  expect(links[0]).toHaveAttribute('href', 'https://www.youtube.com/watch?v=IODxDxX7oi4');
  expect(links[1]).toHaveAttribute('href', 'https://www.youtube.com/watch?v=aclHkVaku9U');
  expect(links[2]).toHaveAttribute('href', 'https://www.youtube.com/watch?v=pSHjTRCQxIw');
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