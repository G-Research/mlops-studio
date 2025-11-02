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
        screen.getByText((content, _element) => {
          return content.includes('You need') && content.includes('versioning capabilities')
        })
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

    // Should show matching suggestions
    await waitFor(() => {
      expect(
        screen.getByText((content, _element) => {
          return content.includes('Steep') && content.includes('learning curve')
        })
      ).toBeInTheDocument()
    })
  })

  it('should filter useWhen suggestions based on input text', async () => {
    const user = userEvent.setup()
    render(<TechnologyFormModal {...defaultProps} suggestions={mockSuggestions} />)

    const useWhenInput = screen.getByPlaceholderText('When to use this technology...')

    // Focus and type specific text that matches only some suggestions
    await user.click(useWhenInput)
    await user.type(useWhenInput, 'versioning')

    await waitFor(() => {
      // Should show the matching suggestion
      expect(
        screen.getByText((content, _element) => {
          return content.includes('You need') && content.includes('versioning capabilities')
        })
      ).toBeInTheDocument()
      // Should not show non-matching suggestions
      expect(
        screen.queryByText((content, _element) => {
          return content.includes('You want') && content.includes('track data lineage')
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
      expect(
        screen.getByText((content, _element) => {
          return content.includes('Performance') && content.includes('overhead')
        })
      ).toBeInTheDocument()
      // Should not show non-matching suggestions
      expect(
        screen.queryByText((content, _element) => {
          return content.includes('Steep') && content.includes('learning curve')
        })
      ).not.toBeInTheDocument()
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
        screen.getByText((content, _element) => {
          return content.includes('You need') && content.includes('versioning capabilities')
        })
      ).toBeInTheDocument()
    })

    // Click on a suggestion
    const suggestion = screen.getByText((content, _element) => {
      return content.includes('You need') && content.includes('versioning capabilities')
    })
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
      expect(
        screen.getByText((content, _element) => {
          return content.includes('Steep') && content.includes('learning curve')
        })
      ).toBeInTheDocument()
    })

    // Click on a suggestion
    const suggestion = screen.getByText((content, _element) => {
      return content.includes('Steep') && content.includes('learning curve')
    })
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
        screen.getByText((content, _element) => {
          return content.includes('You need') && content.includes('versioning capabilities')
        })
      ).toBeInTheDocument()
      expect(
        screen.getByText((content, _element) => {
          return content.includes('You want') && content.includes('track data lineage')
        })
      ).toBeInTheDocument()
    })

    // Click on a suggestion
    const suggestion = screen.getByText((content, _element) => {
      return content.includes('You need') && content.includes('versioning capabilities')
    })
    await user.click(suggestion)

    // Dropdown should be hidden after selection
    await waitFor(() => {
      expect(
        screen.queryByText((content, _element) => {
          return content.includes('You want') && content.includes('track data lineage')
        })
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
          screen.getByText((content, _element) => {
            return content.includes('You want') && content.includes('track data lineage')
          })
        ).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // The already added suggestion should not appear in the dropdown
    expect(
      screen.queryByText((content, _element) => {
        return content.includes('You need') && content.includes('versioning capabilities')
      })
    ).not.toBeInTheDocument()
  })
})
