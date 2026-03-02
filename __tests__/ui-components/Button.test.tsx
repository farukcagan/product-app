import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../../app/components/ui-components/Button';

jest.mock('../../app/components/svg-components', () => ({
    SpinnerSvg: ({ className }: { className?: string }) => (
        <svg data-testid="spinner-svg" className={className} />
    ),
}));

describe('Button Component', () => {
    it('renders children correctly', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('renders with primary variant by default', () => {
        render(<Button>Primary</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-brand-primary');
    });

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-brand-secondary');
    });

    it('renders with outline variant', () => {
        render(<Button variant="outline">Outline</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('border-brand-primary');
    });

    it('renders with ghost variant', () => {
        render(<Button variant="ghost">Ghost</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('text-brand-text-muted');
    });

    it('renders with different sizes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-4 py-2 text-sm');

        rerender(<Button size="md">Medium</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-5 py-3 text-base');

        rerender(<Button size="lg">Large</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-6 py-4 text-lg');

        rerender(<Button size="xl">XL</Button>);
        expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('shows spinner when isLoading is true', () => {
        render(<Button isLoading>Loading</Button>);
        expect(screen.getByTestId('spinner-svg')).toBeInTheDocument();
    });

    it('is disabled when isLoading is true', () => {
        render(<Button isLoading>Loading</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is disabled when disabled prop is passed', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} disabled>Click</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('renders left icon', () => {
        render(<Button leftIcon={<span data-testid="left-icon">←</span>}>With Icon</Button>);
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
        render(<Button rightIcon={<span data-testid="right-icon">→</span>}>With Icon</Button>);
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('does not render icons when loading', () => {
        render(
            <Button
                isLoading
                leftIcon={<span data-testid="left-icon">←</span>}
                rightIcon={<span data-testid="right-icon">→</span>}
            >
                Loading
            </Button>
        );
        expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
        expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Styled</Button>);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('passes additional HTML button props', () => {
        render(<Button type="submit">Submit</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });
});
