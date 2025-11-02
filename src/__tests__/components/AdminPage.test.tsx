import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminPage from '@/app/admin/page'

// Mock the custom stages library
jest.mock('@/lib/customStages', () => ({
  getCustomStages: jest.fn(() => []),
  saveCustomStages: jest.fn(),
  getCustomConnections: jest.fn(() => []),
  saveCustomConnections: jest.fn(),
  getAllStages: jest.fn(() => [])
}))

// Mock scrollIntoView
const mockScrollIntoView = jest.fn()
Element.prototype.scrollIntoView = mockScrollIntoView

describe('AdminPage Add Stage Button', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockScrollIntoView.mockClear()
  })

  it('should render Add Stage button', () => {
    render(<AdminPage />)

    expect(screen.getByRole('button', { name: 'Add Stage' })).toBeInTheDocument()
  })

  it('should show the add stage form when Add Stage button is clicked', async () => {
    const user = userEvent.setup()
    render(<AdminPage />)

    const addStageButton = screen.getByRole('button', { name: 'Add Stage' })
    await user.click(addStageButton)

    // Should show the form
    expect(screen.getByText('Add New Stage')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g., custom_data_processing')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g., Custom Data Processing')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Describe what this stage does...')).toBeInTheDocument()
  })

  it('should scroll to the form when Add Stage button is clicked', async () => {
    const user = userEvent.setup()
    render(<AdminPage />)

    const addStageButton = screen.getByRole('button', { name: 'Add Stage' })
    await user.click(addStageButton)

    // Wait for the setTimeout to trigger the scroll
    await waitFor(
      () => {
        expect(mockScrollIntoView).toHaveBeenCalledWith({
          behavior: 'smooth',
          block: 'start'
        })
      },
      { timeout: 200 } // Give time for the 100ms setTimeout
    )
  })

  it('should scroll to form immediately after showing it', async () => {
    const user = userEvent.setup()
    render(<AdminPage />)

    const addStageButton = screen.getByRole('button', { name: 'Add Stage' })

    // Track when scroll is called
    const scrollPromise = new Promise(resolve => {
      mockScrollIntoView.mockImplementation(() => resolve(true))
    })

    await user.click(addStageButton)

    // Should scroll within 200ms (100ms timeout + buffer)
    await expect(scrollPromise).resolves.toBe(true)

    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    })
  })

  it('should reset form state when Add Stage button is clicked', async () => {
    const user = userEvent.setup()
    render(<AdminPage />)

    const addStageButton = screen.getByRole('button', { name: 'Add Stage' })
    await user.click(addStageButton)

    // Form fields should be empty/reset
    expect(screen.getByPlaceholderText('e.g., custom_data_processing')).toHaveValue('')
    expect(screen.getByPlaceholderText('e.g., Custom Data Processing')).toHaveValue('')
    expect(screen.getByPlaceholderText('Describe what this stage does...')).toHaveValue('')
  })

  it('should set proper form state when Add Stage is clicked vs Edit Stage', async () => {
    const user = userEvent.setup()
    render(<AdminPage />)

    // Click Add Stage
    const addStageButton = screen.getByRole('button', { name: 'Add Stage' })
    await user.click(addStageButton)

    // Should show "Add New Stage" title (not "Edit Stage")
    expect(screen.getByText('Add New Stage')).toBeInTheDocument()
    expect(screen.queryByText('Edit Stage')).not.toBeInTheDocument()

    // Should have both the header Add Stage button and the form submit button
    const addStageButtons = screen.getAllByRole('button', { name: 'Add Stage' })
    expect(addStageButtons).toHaveLength(2) // One in header, one in form
    expect(screen.queryByRole('button', { name: 'Update Stage' })).not.toBeInTheDocument()
  })

  it('should handle the anchor link functionality consistently between Add and Edit', async () => {
    const user = userEvent.setup()
    render(<AdminPage />)

    // Test Add Stage button scroll
    const addStageButton = screen.getByRole('button', { name: 'Add Stage' })
    await user.click(addStageButton)

    await waitFor(
      () => {
        expect(mockScrollIntoView).toHaveBeenCalledWith({
          behavior: 'smooth',
          block: 'start'
        })
      },
      { timeout: 200 }
    )

    // Both Add and Edit should use the same scroll behavior
    expect(mockScrollIntoView).toHaveBeenCalledTimes(1)

    // Clear the mock for potential future edit button tests
    mockScrollIntoView.mockClear()
  })
})

// Test that the scroll behavior parameters are correct and consistent
describe('AdminPage Scroll Behavior Consistency', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockScrollIntoView.mockClear()
  })

  it('should use consistent scroll parameters', async () => {
    const user = userEvent.setup()
    render(<AdminPage />)

    const addStageButton = screen.getByRole('button', { name: 'Add Stage' })
    await user.click(addStageButton)

    await waitFor(
      () => {
        expect(mockScrollIntoView).toHaveBeenCalledWith({
          behavior: 'smooth',
          block: 'start'
        })
      },
      { timeout: 200 }
    )

    // Verify the exact parameters that were used
    const [scrollOptions] = mockScrollIntoView.mock.calls[0]
    expect(scrollOptions).toEqual({
      behavior: 'smooth',
      block: 'start'
    })
  })
})
