import { describe, it, expect } from 'vitest';
import { filterUsers, sortUsers, applyFiltersAndSort } from './users';
import type { User } from '~/server/api/routers/users';

const mockUsers: User[] = [
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
  {
    id: 3,
    firstName: 'Charlie',
    lastName: 'Brown',
    maidenName: '',
    age: 35,
    gender: 'male',
    email: 'charlie@example.com',
    phone: '+1122334455',
    username: 'charlie789',
    birthDate: '1988-12-25',
    image: 'https://example.com/charlie.jpg',
    bloodGroup: 'O+',
    height: 175,
    weight: 75,
    eyeColor: 'green',
    hair: { color: 'black', type: 'straight' },
    address: {
      address: '321 Pine St',
      city: 'Chicago',
      state: 'IL',
      stateCode: 'IL',
      postalCode: '60601',
      coordinates: { lat: 41.8781, lng: -87.6298 },
      country: 'USA',
    },
    university: 'UChicago',
    company: {
      department: 'Sales',
      name: 'Sales Co',
      title: 'Director',
      address: {
        address: '321 Sales Blvd',
        city: 'Chicago',
        state: 'IL',
        stateCode: 'IL',
        postalCode: '60602',
        coordinates: { lat: 41.8781, lng: -87.6298 },
        country: 'USA',
      },
    },
    role: 'admin',
  },
];

describe('filterUsers', () => {
  it('should return all users when no filters are applied', () => {
    const result = filterUsers(mockUsers, '', 'all');
    expect(result).toHaveLength(3);
    expect(result).toEqual(mockUsers);
  });

  it('should filter by search term in firstName', () => {
    const result = filterUsers(mockUsers, 'Alice', 'all');
    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe('Alice');
  });

  it('should filter by search term in lastName', () => {
    const result = filterUsers(mockUsers, 'Brown', 'all');
    expect(result).toHaveLength(2);
    expect(result.every(user => user.lastName === 'Brown')).toBe(true);
  });

  it('should filter by search term in email', () => {
    const result = filterUsers(mockUsers, 'bob@', 'all');
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe('bob@example.com');
  });

  it('should be case-insensitive for search', () => {
    const result = filterUsers(mockUsers, 'ALICE', 'all');
    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe('Alice');
  });

  it('should filter by gender', () => {
    const femaleUsers = filterUsers(mockUsers, '', 'female');
    expect(femaleUsers).toHaveLength(1);
    expect(femaleUsers[0].gender).toBe('female');

    const maleUsers = filterUsers(mockUsers, '', 'male');
    expect(maleUsers).toHaveLength(2);
    expect(maleUsers.every(user => user.gender === 'male')).toBe(true);
  });

  it('should apply both search and gender filters', () => {
    const result = filterUsers(mockUsers, 'Brown', 'male');
    expect(result).toHaveLength(2);
    expect(result.every(user => user.gender === 'male' && user.lastName === 'Brown')).toBe(true);
  });
});

describe('sortUsers', () => {
  it('should sort by firstName ascending', () => {
    const result = sortUsers(mockUsers, 'firstName', 'asc');
    expect(result[0].firstName).toBe('Alice');
    expect(result[1].firstName).toBe('Bob');
    expect(result[2].firstName).toBe('Charlie');
  });

  it('should sort by firstName descending', () => {
    const result = sortUsers(mockUsers, 'firstName', 'desc');
    expect(result[0].firstName).toBe('Charlie');
    expect(result[1].firstName).toBe('Bob');
    expect(result[2].firstName).toBe('Alice');
  });

  it('should sort by age ascending', () => {
    const result = sortUsers(mockUsers, 'age', 'asc');
    expect(result[0].age).toBe(25);
    expect(result[1].age).toBe(30);
    expect(result[2].age).toBe(35);
  });

  it('should sort by email ascending', () => {
    const result = sortUsers(mockUsers, 'email', 'asc');
    expect(result[0].email).toBe('alice@example.com');
    expect(result[1].email).toBe('bob@example.com');
    expect(result[2].email).toBe('charlie@example.com');
  });

  it('should use stable sort with id as secondary key', () => {
    const usersWithSameName = [
      { ...mockUsers[1], id: 4, firstName: 'Bob' },
      { ...mockUsers[1], id: 2, firstName: 'Bob' },
      { ...mockUsers[1], id: 3, firstName: 'Bob' },
    ];
    
    const result = sortUsers(usersWithSameName, 'firstName', 'asc');
    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(3);
    expect(result[2].id).toBe(4);
  });

  it('should not mutate the original array', () => {
    const originalUsers = [...mockUsers];
    sortUsers(mockUsers, 'age', 'desc');
    expect(mockUsers).toEqual(originalUsers);
  });
});

describe('applyFiltersAndSort', () => {
  it('should apply filters and sort in the correct order', () => {
    const result = applyFiltersAndSort(mockUsers, 'Brown', 'male', 'age', 'asc');
    expect(result).toHaveLength(2);
    expect(result[0].age).toBe(30);
    expect(result[1].age).toBe(35);
  });

  it('should handle empty results gracefully', () => {
    const result = applyFiltersAndSort(mockUsers, 'NonExistent', 'all', 'firstName', 'asc');
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should handle empty input array', () => {
    const result = applyFiltersAndSort([], 'test', 'all', 'firstName', 'asc');
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
}); 