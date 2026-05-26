import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TechnologyModal from '@/components/TechnologyModal'
import { mockTechnology, mockHandlers } from '@/test-utils'

describe('TechnologyModal Component', () => {
  const defaultProps = {
    technology: mockTechnology,
    isOpen: true,
    onClose: mockHandlers.onClose,
    onAdd: mockHandlers.onAdd,
    onRemove: mockHandlers.onRemove,
    isAlreadyAdded: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders nothing when not open', () => {
    render(<TechnologyModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByText(mockTechnology.name)).not.toBeInTheDocument()
  })

  it('renders nothing when technology is null', () => {
    render(<TechnologyModal {...defaultProps} technology={null} />)
    expect(screen.queryByText('Test Technology')).not.toBeInTheDocument()
  })

  it('renders technology information when open', () => {
    render(<TechnologyModal {...defaultProps} />)

    expect(screen.getByText(mockTechnology.name)).toBeInTheDocument()
    expect(screen.getByText(mockTechnology.description)).toBeInTheDocument()
    expect(screen.getByAltText(mockTechnology.name)).toBeInTheDocument()
  })

  it('displays subcategories when available', () => {
    render(<TechnologyModal {...defaultProps} />)

    mockTechnology.subcategories?.forEach(subcategory => {
      expect(screen.getByText(subcategory)).toBeInTheDocument()
    })
  })

  it('displays useWhen section when available', () => {
    render(<TechnologyModal {...defaultProps} />)

    expect(screen.getByText('Use it when')).toBeInTheDocument()
    mockTechnology.useWhen?.forEach(useCase => {
      expect(screen.getByText(useCase)).toBeInTheDocument()
    })
  })

  it('displays watchOut section when available', () => {
    render(<TechnologyModal {...defaultProps} />)

    expect(screen.getByText('Watch out')).toBeInTheDocument()
    mockTechnology.watchOut?.forEach(warning => {
      expect(screen.getByText(warning)).toBeInTheDocument()
    })
  })

  it('displays integrations section when available', () => {
    render(<TechnologyModal {...defaultProps} />)

    expect(screen.getByText('Integrates with')).toBeInTheDocument()

    if (mockTechnology.integrations) {
      mockTechnology.integrations.forEach(integration => {
        expect(screen.getByText(integration.tool)).toBeInTheDocument()
        expect(screen.getByText(integration.description)).toBeInTheDocument()
      })
    }
  })

  it('displays installation code when available', () => {
    render(<TechnologyModal {...defaultProps} />)

    expect(screen.getByText('Installation')).toBeInTheDocument()
    expect(screen.getByText(mockTechnology.installation!.code)).toBeInTheDocument()
  })

  it('displays Add to Stack button when not already added', () => {
    render(<TechnologyModal {...defaultProps} isAlreadyAdded={false} />)

    expect(screen.getByText('Add to Stack')).toBeInTheDocument()
    expect(screen.queryByText('Remove from Stack')).not.toBeInTheDocument()
  })

  it('displays Remove from Stack button when already added', () => {
    render(<TechnologyModal {...defaultProps} isAlreadyAdded={true} />)

    expect(screen.getByText('Remove from Stack')).toBeInTheDocument()
    expect(screen.queryByText('Add to Stack')).not.toBeInTheDocument()
  })

  it('calls onAdd when Add to Stack button is clicked', async () => {
    const user = userEvent.setup()
    render(<TechnologyModal {...defaultProps} isAlreadyAdded={false} />)

    const addButton = screen.getByText('Add to Stack')
    await user.click(addButton)

    expect(mockHandlers.onAdd).toHaveBeenCalledTimes(1)
  })

  it('calls onRemove when Remove from Stack button is clicked', async () => {
    const user = userEvent.setup()
    render(<TechnologyModal {...defaultProps} isAlreadyAdded={true} />)

    const removeButton = screen.getByText('Remove from Stack')
    await user.click(removeButton)

    expect(mockHandlers.onRemove).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<TechnologyModal {...defaultProps} />)

    const closeButton = screen.getByRole('button', { name: /×/ })
    await user.click(closeButton)

    expect(mockHandlers.onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when background is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(<TechnologyModal {...defaultProps} />)

    // Click on the modal backdrop (the outer div with fixed positioning and overlay)
    const backdrop = container.querySelector('.fixed.inset-0.bg-black.bg-opacity-50')
    if (backdrop) {
      await user.click(backdrop)
      expect(mockHandlers.onClose).toHaveBeenCalledTimes(1)
    } else {
      // Fallback: simulate click event directly on the backdrop
      fireEvent.click(container.firstChild as Element)
      expect(mockHandlers.onClose).toHaveBeenCalledTimes(1)
    }
  })

  it('does not call onClose when modal content is clicked', async () => {
    const user = userEvent.setup()
    render(<TechnologyModal {...defaultProps} />)

    const modalContent = screen.getByText(mockTechnology.name)
    await user.click(modalContent)

    expect(mockHandlers.onClose).not.toHaveBeenCalled()
  })

  it('handles escape key to close modal', () => {
    render(<TechnologyModal {...defaultProps} />)

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

    expect(mockHandlers.onClose).toHaveBeenCalledTimes(1)
  })

  it('does not handle other keys', () => {
    render(<TechnologyModal {...defaultProps} />)

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' })

    expect(mockHandlers.onClose).not.toHaveBeenCalled()
  })

  it('prevents body scrolling when open', () => {
    render(<TechnologyModal {...defaultProps} />)

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scrolling when closed', () => {
    const { rerender } = render(<TechnologyModal {...defaultProps} />)

    // Modal is open, body scroll should be hidden
    expect(document.body.style.overflow).toBe('hidden')

    // Close modal
    rerender(<TechnologyModal {...defaultProps} isOpen={false} />)

    // Body scroll should be restored
    expect(document.body.style.overflow).toBe('unset')
  })

  it('renders external links correctly', () => {
    const technologyWithLinks = {
      ...mockTechnology,
      websiteUrl: 'https://example.com/website',
      repoUrl: 'https://example.com/repo',
      docsUrl: 'https://example.com/docs'
    }

    render(<TechnologyModal {...defaultProps} technology={technologyWithLinks} />)

    expect(screen.getByText('Website →')).toBeInTheDocument()
    expect(screen.getByText('Repository →')).toBeInTheDocument()
    expect(screen.getByText('Documentation →')).toBeInTheDocument()

    expect(screen.getByText('Website →').closest('a')).toHaveAttribute(
      'href',
      'https://example.com/website'
    )
    expect(screen.getByText('Repository →').closest('a')).toHaveAttribute(
      'href',
      'https://example.com/repo'
    )
    expect(screen.getByText('Documentation →').closest('a')).toHaveAttribute(
      'href',
      'https://example.com/docs'
    )
  })

  it('handles missing optional fields gracefully', () => {
    const minimalTechnology = {
      id: 'minimal-tech',
      name: 'Minimal Tech',
      description: 'A minimal technology',
      category: 'experimentation' as const
    }

    render(<TechnologyModal {...defaultProps} technology={minimalTechnology} />)

    expect(screen.getByText('Minimal Tech')).toBeInTheDocument()
    expect(screen.getByText('A minimal technology')).toBeInTheDocument()
    expect(screen.queryByText('Use it when')).not.toBeInTheDocument()
    expect(screen.queryByText('Watch out')).not.toBeInTheDocument()
    expect(screen.queryByText('Integrates with')).not.toBeInTheDocument()
    expect(screen.queryByText('Installation')).not.toBeInTheDocument()
  })
})
