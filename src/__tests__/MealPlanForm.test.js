import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MealPlanForm from '../MealPlanForm';

// useNavigate is a hook that needs to be mocked
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper to render with router context (required since useNavigate is used)
const renderMealPlan = () => render(
  <MemoryRouter>
    <MealPlanForm />
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
    if (url.includes('localhost:5001/mealplan')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ text: 'Here is your meal plan...' }),
      });
    }
  });
});

afterEach(() => {
    jest.resetAllMocks();
})

// --- Rendering Tests ---

test('renders the main heading', () => {
    renderMealPlan();
    expect(screen.getByText('Meal Plan Form')).toBeInTheDocument();  
})

test('renders the submit button', () => {
    renderMealPlan();
    expect(screen.getByRole('button', { name: /generate meal plan/i })).toBeInTheDocument();
})

test('renders the back button', () => {
    renderMealPlan();
    expect(screen.getByRole('button', { name: /back to meal plan/i })).toBeInTheDocument();
})

// --- Interaction Tests ---

test('allows user to enter additional details in the textarea', async () => {
    renderMealPlan();
    const user = userEvent.setup();
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'I would like to have eggs.');
    expect(textarea.value).toBe('I would like to have eggs.');
})