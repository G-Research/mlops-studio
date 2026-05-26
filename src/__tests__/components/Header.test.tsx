import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('Header Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  it('renders the header with logo and navigation', () => {
    render(<Header />)

    // Check for main branding text
    expect(screen.getByText('MLOps Studio')).toBeInTheDocument()

    // Check for navigation links
    expect(screen.getByRole('link', { name: /stack builder/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /tools/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /example stacks/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument()
  })

  it('highlights the active navigation item', () => {
    mockUsePathname.mockReturnValue('/tools')
    render(<Header />)

    const toolsLink = screen.getByRole('link', { name: /tools/i })
    expect(toolsLink).toHaveClass('bg-gray-700', 'text-white')
  })

  it('does not highlight inactive navigation items', () => {
    mockUsePathname.mockReturnValue('/tools')
    render(<Header />)

    const stackBuilderLink = screen.getByRole('link', { name: /stack builder/i })
    expect(stackBuilderLink).toHaveClass('text-gray-300')

    const adminLink = screen.getByRole('link', { name: /admin/i })
    expect(adminLink).toHaveClass('text-gray-300')
  })

  it('handles root path correctly', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Header />)

    const stackBuilderLink = screen.getByRole('link', { name: /stack builder/i })
    expect(stackBuilderLink).toHaveClass('bg-gray-700', 'text-white')
  })

  it('has correct link hrefs', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: /stack builder/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /tools/i })).toHaveAttribute('href', '/tools')
    expect(screen.getByRole('link', { name: /example stacks/i })).toHaveAttribute(
      'href',
      '/examples'
    )
    expect(screen.getByRole('link', { name: /admin/i })).toHaveAttribute('href', '/admin')
  })

  it('renders the MLOps Studio logo link', () => {
    render(<Header />)

    const logoLink = screen.getByRole('link', { name: /MLOps Studio/ })
    expect(logoLink).toHaveAttribute('href', '/')
    expect(logoLink).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Header />)

    // Check for header element
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    // Check for navigation
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  describe('responsive behavior', () => {
    it('renders navigation items in expected order', () => {
      render(<Header />)

      const links = screen.getAllByRole('link')
      const navigationLinks = links.filter(
        link =>
          link.textContent?.includes('Stack builder') ||
          link.textContent?.includes('Tools') ||
          link.textContent?.includes('Example stacks') ||
          link.textContent?.includes('Admin')
      )

      expect(navigationLinks).toHaveLength(4)
      expect(navigationLinks[0]).toHaveTextContent('Stack builder')
      expect(navigationLinks[1]).toHaveTextContent('Tools')
      expect(navigationLinks[2]).toHaveTextContent('Example stacks')
      expect(navigationLinks[3]).toHaveTextContent('Admin')
    })
  })
})
