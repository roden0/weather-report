import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from '../pages/ContactPage';
import { LanguageProvider } from '../contexts/LanguageContext';
import * as useContactFormModule from '../hooks/useContactForm';

vi.mock('../hooks/useContactForm', async () => {
  const actual = await vi.importActual('../hooks/useContactForm');
  return {
    ...actual,
    useContactForm: vi.fn(),
  };
});

describe('ContactPage Component', () => {
  it('renders form correctly', () => {
    // Mock the hook return value
    vi.mocked(useContactFormModule.useContactForm).mockReturnValue({
      formData: {
        name: '',
        dateOfBirth: '',
        city: '',
        email: '',
        phone: '',
      },
      errors: {},
      submitted: false,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
      resetForm: vi.fn(),
    });

    render(
      <LanguageProvider>
        <ContactPage />
      </LanguageProvider>,
    );

    expect(screen.getByText('Contact Form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('shows success message when form is submitted', () => {
    // Mock the hook return value with submitted=true
    vi.mocked(useContactFormModule.useContactForm).mockReturnValue({
      formData: {
        name: '',
        dateOfBirth: '',
        city: '',
        email: '',
        phone: '',
      },
      errors: {},
      submitted: true,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
      resetForm: vi.fn(),
    });

    render(
      <LanguageProvider>
        <ContactPage />
      </LanguageProvider>,
    );

    expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
  });

  it('handles form input changes', async () => {
    const user = userEvent.setup();
    const mockHandleChange = vi.fn();

    // Mock the hook return value
    vi.mocked(useContactFormModule.useContactForm).mockReturnValue({
      formData: {
        name: 'John',
        dateOfBirth: '',
        city: '',
        email: '',
        phone: '',
      },
      errors: {},
      submitted: false,
      handleChange: mockHandleChange,
      handleSubmit: vi.fn(),
      resetForm: vi.fn(),
    });

    render(
      <LanguageProvider>
        <ContactPage />
      </LanguageProvider>,
    );

    const nameInput = screen.getByLabelText(/Name/);
    await user.type(nameInput, 'Doe');

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('handles form submission', async () => {
    const user = userEvent.setup();
    const mockHandleSubmit = vi.fn((e) => e.preventDefault());

    // Mock the hook return value
    vi.mocked(useContactFormModule.useContactForm).mockReturnValue({
      formData: {
        name: 'John Doe',
        dateOfBirth: '1990-01-01',
        city: 'New York',
        email: 'john@example.com',
        phone: '123-456-7890',
      },
      errors: {},
      submitted: false,
      handleChange: vi.fn(),
      handleSubmit: mockHandleSubmit,
      resetForm: vi.fn(),
    });

    render(
      <LanguageProvider>
        <ContactPage />
      </LanguageProvider>,
    );

    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
