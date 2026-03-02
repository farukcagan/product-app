import { render, screen } from '@testing-library/react';
import { Card } from '../../app/components/ui-components/Card';

describe('Card Component', () => {
    it('renders children correctly', () => {
        render(<Card><p>Card content</p></Card>);
        expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with title', () => {
        render(<Card title="Card Title"><p>Content</p></Card>);
        expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('renders with description', () => {
        render(<Card description="Card description text"><p>Content</p></Card>);
        expect(screen.getByText('Card description text')).toBeInTheDocument();
    });

    it('renders with both title and description', () => {
        render(
            <Card title="Title" description="Description">
                <p>Content</p>
            </Card>
        );
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('does not render header section when no title or description', () => {
        const { container } = render(<Card><p>Content</p></Card>);
        const headerDiv = container.querySelector('.mb-6');
        expect(headerDiv).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Card className="custom-card"><p>Content</p></Card>);
        const card = container.firstChild;
        expect(card).toHaveClass('custom-card');
    });

    it('has default styling classes', () => {
        const { container } = render(<Card><p>Content</p></Card>);
        const card = container.firstChild;
        expect(card).toHaveClass('bg-white');
        expect(card).toHaveClass('rounded-[20px]');
        expect(card).toHaveClass('border');
        expect(card).toHaveClass('shadow-sm');
    });

    it('renders title in h3 element', () => {
        render(<Card title="My Title"><p>Content</p></Card>);
        const heading = screen.getByRole('heading', { level: 3 });
        expect(heading).toHaveTextContent('My Title');
    });
});
