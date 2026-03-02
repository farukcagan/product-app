import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Checkbox } from '../../app/components/ui-components/Checkbox';

jest.mock('../../app/components/svg-components', () => ({
    CheckSvg: ({ className }: { className?: string }) => (
        <svg data-testid="check-svg" className={className} />
    ),
}));

describe('Checkbox Component', () => {
    it('renders checkbox input', () => {
        render(<Checkbox />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders label when provided', () => {
        render(<Checkbox label="Remember me?" />);
        expect(screen.getByText('Remember me?')).toBeInTheDocument();
    });

    it('does not render label text when not provided', () => {
        const { container } = render(<Checkbox />);
        const spans = container.querySelectorAll('span');
        // Only the visual checkbox elements, no label text span
        const labelSpan = Array.from(spans).find(s => s.textContent && s.textContent.trim().length > 0 && !s.querySelector('*'));
        expect(labelSpan).toBeUndefined();
    });

    it('handles checked state changes', () => {
        const handleChange = jest.fn();
        render(<Checkbox onChange={handleChange} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalled();
    });

    it('can be checked by default', () => {
        render(<Checkbox defaultChecked />);
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('can be controlled via checked prop', () => {
        render(<Checkbox checked onChange={() => { }} />);
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('renders as disabled', () => {
        render(<Checkbox disabled />);
        expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('applies custom className', () => {
        const { container } = render(<Checkbox className="custom-checkbox" />);
        const label = container.querySelector('label');
        expect(label).toHaveClass('custom-checkbox');
    });

    it('renders check icon SVG', () => {
        render(<Checkbox />);
        expect(screen.getByTestId('check-svg')).toBeInTheDocument();
    });

    it('passes id prop to input', () => {
        render(<Checkbox id="remember-me" />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'remember-me');
    });

    it('forwards ref to checkbox input', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Checkbox ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('is visually hidden (sr-only)', () => {
        render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveClass('sr-only');
    });
});
