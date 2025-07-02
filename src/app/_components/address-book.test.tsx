import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import AddressBook from './address-book';

vi.mock('~/trpc/react', () => ({
  api: {
    users: {
      getAll: {
        useQuery: vi.fn(),
      },
    },
  },
}));

const mockUsers = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Anderson',
    maidenName: 'Smith',
    age: 25,
    gender: 'female',
    email: 'alice@example.com',
    phone: '+1234567890',
    username: 'alice123',
    birthDate: '1998-01-01',
    image: 'https://example.com/alice.jpg',
    bloodGroup: 'A+',
    height: 165,
    weight: 60,
    eyeColor: 'blue',
    hair: { color: 'blonde', type: 'straight' },
    address: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      stateCode: 'NY',
      postalCode: '10001',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      country: 'USA',
    },
    university: 'NYU',
    company: {
      department: 'Engineering',
      name: 'Tech Corp',
      title: 'Developer',
      address: {
        address: '456 Tech Ave',
        city: 'New York',
        state: 'NY',
        stateCode: 'NY',
        postalCode: '10002',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        country: 'USA',
      },
    },
    role: 'user',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Brown',
    maidenName: '',
    age: 30,
    gender: 'male',
    email: 'bob@example.com',
    phone: '+0987654321',
    username: 'bob456',
    birthDate: '1993-06-15',
    image: 'https://example.com/bob.jpg',
    bloodGroup: 'B+',
    height: 180,
    weight: 80,
    eyeColor: 'brown',
    hair: { color: 'brown', type: 'curly' },
    address: {
      address: '789 Oak St',
      city: 'Los Angeles',
      state: 'CA',
      stateCode: 'CA',
      postalCode: '90001',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      country: 'USA',
    },
    university: 'UCLA',
    company: {
      department: 'Marketing',
      name: 'Marketing Inc',
      title: 'Manager',
      address: {
        address: '789 Market St',
        city: 'Los Angeles',
        state: 'CA',
        stateCode: 'CA',
        postalCode: '90002',
        coordinates: { lat: 34.0522, lng: -118.2437 },
        country: 'USA',
      },
    },
    role: 'moderator',
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('AddressBook Component', () => {
  const mockUseQuery = vi.fn();

  beforeAll(async () => {
    const { api } = await import('~/trpc/react');
    api.users.getAll.useQuery = mockUseQuery;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
      isPlaceholderData: false,
      isFetching: false,
    });

    renderWithProviders(<AddressBook />);
    
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('should render users when data is loaded', async () => {
    mockUseQuery.mockReturnValue({
      data: { 
        users: mockUsers, 
        total: 2, 
        skip: 0, 
        limit: 2,
        hasMore: false,
        nextCursor: undefined
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      isPlaceholderData: false,
      isFetching: false,
    });

    renderWithProviders(<AddressBook />);
    
    await waitFor(() => {
      expect(screen.getByText('Alice Anderson')).toBeInTheDocument();
      expect(screen.getByText('Bob Brown')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Showing 2 of 2 users')).toBeInTheDocument();
  });

  it('should render error state when there is an error', () => {
    const mockRefetch = vi.fn();
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch users' },
      refetch: mockRefetch,
      isPlaceholderData: false,
      isFetching: false,
    });

    renderWithProviders(<AddressBook />);
    
    expect(screen.getByText('Error loading users')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
    
    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);
    
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('should render empty state when no users match filters', () => {
    mockUseQuery.mockReturnValue({
      data: { 
        users: [], 
        total: 0, 
        skip: 0, 
        limit: 0,
        hasMore: false,
        nextCursor: undefined
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      isPlaceholderData: false,
      isFetching: false,
    });

    renderWithProviders(<AddressBook />);
    
    expect(screen.getByText('No users available')).toBeInTheDocument();
  });

  it('should update search input and trigger query', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: { 
        users: mockUsers, 
        total: 2, 
        skip: 0, 
        limit: 2,
        hasMore: false,
        nextCursor: undefined
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      isPlaceholderData: false,
      isFetching: false,
    });

    renderWithProviders(<AddressBook />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    await user.type(searchInput, 'Alice');
    
    expect(searchInput).toHaveValue('Alice');
    
    await waitFor(() => {
      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          search: expect.any(String),
        }),
        expect.any(Object)
      );
    });
  });

  it('should update gender filter', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: { 
        users: mockUsers, 
        total: 2, 
        skip: 0, 
        limit: 2,
        hasMore: false,
        nextCursor: undefined
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      isPlaceholderData: false,
      isFetching: false,
    });

    renderWithProviders(<AddressBook />);
    
    const maleButton = screen.getByRole('button', { name: 'Show only male users' });
    await user.click(maleButton);
    
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        gender: 'male',
      }),
      expect.any(Object)
    );
  });

  it('should update sort order when clicking active sort button', async () => {
    const user = userEvent.setup();
    mockUseQuery.mockReturnValue({
      data: { 
        users: mockUsers, 
        total: 2, 
        skip: 0, 
        limit: 2,
        hasMore: false,
        nextCursor: undefined
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      isPlaceholderData: false,
      isFetching: false,
    });

    renderWithProviders(<AddressBook />);
    
    const firstNameButton = screen.getByRole('button', { name: /Sort by First Name/i });
    await user.click(firstNameButton);
    
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        sortOrder: 'desc',
      }),
      expect.any(Object)
    );
  });

  it('should be accessible', () => {
    mockUseQuery.mockReturnValue({
      data: { 
        users: mockUsers, 
        total: 2, 
        skip: 0, 
        limit: 2,
        hasMore: false,
        nextCursor: undefined
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      isPlaceholderData: false,
      isFetching: false,
    });

    const { container } = renderWithProviders(<AddressBook />);
    
    expect(screen.getByRole('heading', { name: 'Address Book' })).toBeInTheDocument();
    
    expect(screen.getByLabelText('Search users by name or email')).toBeInTheDocument();
    
    const allButtons = screen.getAllByRole('button');
    const filterButtons = allButtons.filter(button => {
      const ariaPressed = button.getAttribute('aria-pressed');
      return ariaPressed === 'true' || ariaPressed === 'false';
    });
    expect(filterButtons.length).toBeGreaterThan(0);
  });
}); 