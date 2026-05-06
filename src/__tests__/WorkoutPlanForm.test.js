import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import WorkoutPlanForm from '../WorkoutPlanForm';

// useNavigate is a hook that needs to be mocked
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper to render with router context (required since useNavigate is used)
const renderWorkoutPlan = () => render(
  <MemoryRouter>
    <WorkoutPlanForm />
  </MemoryRouter>
);

// Clear mock call history between tests
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('localhost:5000/profile')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          currentWeight: 180,
          goalWeight: 160,
          height: 70,
          age: 25,
          gender: 'Male'
        }),
      });
    }
    if (url.includes('localhost:5001/workoutplan')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ text: 'Here is your workout plan...' }),
      });
    }
  });
});

afterEach(() => {
    jest.resetAllMocks();
})

// --- Rendering Tests ---

test('renders the main heading', () => {
    renderWorkoutPlan();
    expect(screen.getByText('Workout Plan Form')).toBeInTheDocument();  
})

test('renders the reason label and dropdown', () => {
    renderWorkoutPlan();
    expect(screen.getByText(/Reason for wanting to update your workout plan:/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
})

test('renders the additional details label and text area', () => {
    renderWorkoutPlan();
    expect(screen.getByText(/Is there anything we should account for in future workouts?/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
})

test('renders the submit button', () => {
    renderWorkoutPlan();
    expect(screen.getByRole('button', { name: /change workout plan/i })).toBeInTheDocument();
})

// --- Interaction Tests ---

test('submitting the form displays the AI response', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <WorkoutPlanForm />
    </MemoryRouter>
  );

  const button = screen.getByRole('button', { name: /change workout plan/i });
  await user.click(button);

  // Check that the generated workout plan section appears
  expect(await screen.findByText('Generated Workout Plan:')).toBeInTheDocument();
});

test('allows user to select a reason from the dropdown', async () => {
    renderWorkoutPlan();
    const user = userEvent.setup();
    const dropdown = screen.getByRole('combobox');
    const options = within(dropdown).getAllByRole('option');
    const firstOption = options[0].value;
    await user.selectOptions(dropdown, firstOption);
    expect(dropdown.value).toBe(firstOption);
})

test('allows user to enter additional details in the textarea', async () => {
    renderWorkoutPlan();
    const user = userEvent.setup();
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'I have a knee injury that limits my exercises.');
    expect(textarea.value).toBe('I have a knee injury that limits my exercises.');
})