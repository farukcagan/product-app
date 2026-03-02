import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Select } from '../../app/components/ui-components/Select';

jest.mock('../../app/components/svg-components', () => ({
    ChevronSvg: () => <svg data-testid="chevron-svg" />,
}));

const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
];

describe('Select Component', () => {
    it('renders select element', () => {
        render(<Select options={mockOptions} />);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders all options', () => {
        render(<Select options={mockOptions} />);
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent('Option 1');
        expect(options[1]).toHaveTextContent('Option 2');
        expect(options[2]).toHaveTextContent('Option 3');
    });

    it('renders label when provided', () => {
        render(<Select label="Category" id="category" options={mockOptions} />);
        expect(screen.getByText('Category')).toBeInTheDocument();
    });

    it('does not render label when not provided', () => {
        const { container } = render(<Select options={mockOptions} />);
        const labels = container.querySelectorAll('label');
        expect(labels.length).toBe(0);
    });

    it('links label to select via htmlFor/id', () => {
        render(<Select label="Category" id="category-select" options={mockOptions} />);
        const label = screen.getByText('Category');
        expect(label).toHaveAttribute('for', 'category-select');
    });

    it('renders error message when provided', () => {
        render(<Select error="Selection required" options={mockOptions} />);
        expect(screen.getByText('Selection required')).toBeInTheDocument();
    });

    it('does not render error when not provided', () => {
        const { container } = render(<Select options={mockOptions} />);
        const errorP = container.querySelector('.text-red-500');
        expect(errorP).not.toBeInTheDocument();
    });

    it('applies error styles when error is present', () => {
        render(<Select error="Error" options={mockOptions} />);
        const select = screen.getByRole('combobox');
        expect(select.className).toContain('border-red-500');
    });

    it('handles value changes', () => {
        const handleChange = jest.fn();
        render(<Select options={mockOptions} onChange={handleChange} />);
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('renders as disabled', () => {
        render(<Select options={mockOptions} disabled />);
        expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('applies custom className', () => {
        render(<Select options={mockOptions} className="custom-select" />);
        expect(screen.getByRole('combobox')).toHaveClass('custom-select');
    });

    it('renders chevron icon', () => {
        render(<Select options={mockOptions} />);
        expect(screen.getByTestId('chevron-svg')).toBeInTheDocument();
    });

    it('forwards ref to select element', () => {
        const ref = React.createRef<HTMLSelectElement>();
        render(<Select ref={ref} options={mockOptions} />);
        expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it('renders options with correct values', () => {
        render(<Select options={mockOptions} />);
        const options = screen.getAllByRole('option') as HTMLOptionElement[];
        expect(options[0].value).toBe('1');
        expect(options[1].value).toBe('2');
        expect(options[2].value).toBe('3');
    });
});
