import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Input } from '../../app/components/ui-components/Input';

describe('Input Component', () => {
    it('renders input element', () => {
        render(<Input placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders label when provided', () => {
        render(<Input label="Email" id="email" />);
        expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('does not render label when not provided', () => {
        const { container } = render(<Input id="email" />);
        expect(container.querySelector('label')).not.toBeInTheDocument();
    });

    it('links label to input via htmlFor/id', () => {
        render(<Input label="Email" id="email-input" />);
        const label = screen.getByText('Email');
        expect(label).toHaveAttribute('for', 'email-input');
    });

    it('renders with left icon', () => {
        render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} />);
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right element', () => {
        render(<Input rightElement={<button data-testid="right-btn">👁</button>} />);
        expect(screen.getByTestId('right-btn')).toBeInTheDocument();
    });

    it('renders error message when provided', () => {
        render(<Input error="This field is required" />);
        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('does not render error message when not provided', () => {
        const { container } = render(<Input />);
        expect(container.querySelector('.text-red-500')).not.toBeInTheDocument();
    });

    it('applies error styles when error is present', () => {
        render(<Input error="Error" id="test" />);
        const input = screen.getByRole('textbox');
        expect(input.className).toContain('border-red-500');
    });

    it('handles value changes', () => {
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('renders as disabled', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('renders with required attribute', () => {
        render(<Input required />);
        expect(screen.getByRole('textbox')).toBeRequired();
    });

    it('applies custom className', () => {
        render(<Input className="custom-input" />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('custom-input');
    });

    it('renders different input types', () => {
        const { container } = render(<Input type="password" />);
        const input = container.querySelector('input');
        expect(input).toHaveAttribute('type', 'password');
    });

    it('adds left padding when leftIcon is present', () => {
        render(<Input leftIcon={<span>🔍</span>} />);
        const input = screen.getByRole('textbox');
        expect(input.className).toContain('pl-12');
    });

    it('adds right padding when rightElement is present', () => {
        render(<Input rightElement={<span>👁</span>} />);
        const input = screen.getByRole('textbox');
        expect(input.className).toContain('pr-12');
    });

    it('forwards ref to the input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Input ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
