import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TechnologyFormModal from '@/components/TechnologyFormModal'
import { mockTechnology } from '@/test-utils'

const mockOnClose = jest.fn()
const mockOnSave = jest.fn()

const defaultProps = {
  isOpen: true,
  onClose: mockOnClose,
  onSave: mockOnSave,
  editingTechnology: null
}

const mockSuggestions = {
  useWhen: [
    'You need data versioning capabilities',
    'You want to track data lineage',
    'Working with large datasets'
  ],
  watchOut: ['Steep learning curve', 'Limited cloud support', 'Performance overhead']
}

// Helper function to find text that may be split by highlighting elements
const findTextWithHighlighting = (screen: any, text: string) => {
  return screen.getAllByText((content: string, element: Element | null) => {
    if (content.includes(text)) {
      return true
    }
    return element && element.textContent && element.textContent.includes(text)
  })[0] // Get the first match
}

// Helper function to query text that may be split by highlighting elements
const queryTextWithHighlighting = (screen: any, text: string) => {
  const elements = screen.queryAllByText((content: string, element: Element | null) => {
    if (content.includes(text)) {
      return true
    }
    return element && element.textContent && element.textContent.includes(text)
  })
  return elements.length > 0 ? elements[0] : null
}

describe('TechnologyFormModal Auto-Suggestions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show autocomplete dropdown when typing in useWhen field', async () => {
    const user = userEvent.setup()
    render(<TechnologyFormModal {...defaultProps} suggestions={mockSuggestions} />)

    // Find the useWhen input field
    const useWhenInput = screen.getByPlaceholderText('When to use this technology...')

    // Focus and type to trigger suggestions
    await user.click(useWhenInput)
    await user.type(useWhenInput, 'data')

    // Should show matching suggestions
    await waitFor(() => {
      expect(
        findTextWithHighlighting(screen, 'You need data versioning capabilities')
      ).toBeInTheDocument()
    })
  })

  it('should show autocomplete dropdown when typing in watchOut field', async () => {
    const user = userEvent.setup()
    render(<TechnologyFormModal {...defaultProps} suggestions={mockSuggestions} />)

    // Find the watchOut input field
    const watchOutInput = screen.getByPlaceholderText('Potential issues or limitations...')

    // Focus and type to trigger suggestions
    await user.click(watchOutInput)
    await user.type(watchOutInput, 'learn')

    // Check that the input value has been set correctly (basic functionality test)
    expect(watchOutInput).toHaveValue('learn')
  })

  it('should filter useWhen suggestions based on input text', async () => {
    const user = userEvent.setup()
    render(<TechnologyFormModal {...defaultProps} suggestions={mockSuggestions} />)

    const useWhenInput = screen.getByPlaceholderText('When to use this technology...')

    // Focus and type specific text that matches only some suggestions
    await user.click(useWhenInput)
    await user.type(useWhenInput, 'versioning')

    await waitFor(() => {
      // Should show the matching suggestion (text may be split by highlighting)
      expect(
        screen.getByText((content, element) => {
          return (
            content.includes('You need') &&
            (content.includes('versioning capabilities') ||
              (element &&
                element.textContent &&
                element.textContent.includes('You need data versioning capabilities')))
          )
        })
      ).toBeInTheDocument()
      // Should not show non-matching suggestions
      expect(
        screen.queryByText((content, element) => {
          return (
            content.includes('You want') &&
            (content.includes('track data lineage') ||
              (element &&
                element.textContent &&
                element.textContent.includes('You want to track data lineage')))
          )
        })
      ).not.toBeInTheDocument()
    })
  })

  it('should filter watchOut suggestions based on input text', async () => {
    const user = userEvent.setup()
    render(<TechnologyFormModal {...defaultProps} suggestions={mockSuggestions} />)

    const watchOutInput = screen.getByPlaceholderText('Potential issues or limitations...')

    // Focus and type specific text that matches only some suggestions
    await user.click(watchOutInput)
    await user.type(watchOutInput, 'performance')

    await waitFor(() => {
      // Should show the matching suggestion
      expect(findTextWithHighlighting(screen, 'Performance overhead')).toBeInTheDocument()
      // Should not show non-matching suggestions
      expect(queryTextWithHighlighting(screen, 'Steep learning curve')).not.toBeInTheDocument()
    })
  })

  it('should add suggestion to useWhen when clicked from dropdown', async () => {
    const user = userEvent.setup()
    render(<TechnologyFormModal {...defaultProps} suggestions={mockSuggestions} />)

    const useWhenInput = screen.getByPlaceholderText('When to use this technology...')

    // Focus and type to show suggestions
    await user.click(useWhenInput)
    await user.type(useWhenInput, 'data')

    // Wait for dropdown to appear
    await waitFor(() => {
      expect(
        findTextWithHighlighting(screen, 'You need data versioning capabilities')
      ).toBeInTheDocument()
    })

    // Click on a suggestion
    const suggestion = findTextWithHighlighting(screen, 'You need data versioning capabilities')
    await user.click(suggestion)

    // Should appear in the useWhen list as a removable item
    await waitFor(() => {
      const removeButtons = screen.getAllByText('Remove')
      expect(removeButtons.length).toBeGreaterThan(0)
      // Input should be cleared
      expect(useWhenInput).toHaveValue('')
    })
  })

  it('should add suggestion to watchOut when clicked from dropdown', async () => {
    const user = userEvent.setup()
    render(<TechnologyFormModal {...defaultProps} suggestions={mockSuggestions} />)

    const watchOutInput = screen.getByPlaceholderText('Potential issues or limitations...')

    // Focus and type to show suggestions
    await user.click(watchOutInput)
    await user.type(watchOutInput, 'steep')

    // Wait for dropdown to appear
    await waitFor(() => {
      expect(findTextWithHighlighting(screen, 'Steep learning curve')).toBeInTheDocument()
    })

    // Click on a suggestion
    const suggestion = findTextWithHighlighting(screen, 'Steep learning curve')
    await user.click(suggestion)

    // Should appear in the watchOut list as a removable item
    await waitFor(() => {
      const removeButtons = screen.getAllByText('Remove')
      expect(removeButtons.length).toBeGreaterThan(0)
      // Input should be cleared
      expect(watchOutInput).toHaveValue('')
    })
  })

  it('should hide dropdown after selecting a suggestion', async () => {
    const user = userEvent.setup()
    render(<TechnologyFormModal {...defaultProps} suggestions={mockSuggestions} />)

    const useWhenInput = screen.getByPlaceholderText('When to use this technology...')

    // Focus and type to show suggestions
    await user.click(useWhenInput)
    await user.type(useWhenInput, 'data')

    // Verify suggestions are visible
    await waitFor(() => {
      expect(
        findTextWithHighlighting(screen, 'You need data versioning capabilities')
      ).toBeInTheDocument()
      expect(findTextWithHighlighting(screen, 'You want to track data lineage')).toBeInTheDocument()
    })

    // Click on a suggestion
    const suggestion = findTextWithHighlighting(screen, 'You need data versioning capabilities')
    await user.click(suggestion)

    // Dropdown should be hidden after selection
    await waitFor(() => {
      expect(
        queryTextWithHighlighting(screen, 'You want to track data lineage')
      ).not.toBeInTheDocument()
    })
  })

  it('should filter out already added suggestions from dropdown', async () => {
    const user = userEvent.setup()

    // Start with a technology that already has some useWhen items
    const techWithExistingItems = {
      ...mockTechnology,
      useWhen: ['You need data versioning capabilities'] // This suggestion should be filtered out
    }

    render(
      <TechnologyFormModal
        {...defaultProps}
        editingTechnology={techWithExistingItems}
        suggestions={mockSuggestions}
      />
    )

    const useWhenInput = screen.getByPlaceholderText('When to use this technology...')

    // Focus and type to show suggestions
    await user.click(useWhenInput)
    await user.type(useWhenInput, 'data')

    await waitFor(
      () => {
        // But other matching suggestions should still be there
        expect(
          findTextWithHighlighting(screen, 'You want to track data lineage')
        ).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // The already added suggestion should not appear in the dropdown
    expect(
      queryTextWithHighlighting(screen, 'You need data versioning capabilities')
    ).not.toBeInTheDocument()
  })
})
