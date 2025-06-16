import { z } from "zod";

// Hair schema
export const HairSchema = z.object({
  color: z.string(),
  type: z.string(),
});

// Coordinates schema
export const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

// Address schema
export const AddressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  stateCode: z.string(),
  postalCode: z.string(),
  coordinates: CoordinatesSchema,
  country: z.string(),
});

// Company schema
export const CompanySchema = z.object({
  department: z.string(),
  name: z.string(),
  title: z.string(),
  address: AddressSchema,
});

// Bank schema
export const BankSchema = z.object({
  cardExpire: z.string(),
  cardNumber: z.string(),
  cardType: z.string(),
  currency: z.string(),
  iban: z.string(),
});

// Crypto schema
export const CryptoSchema = z.object({
  coin: z.string(),
  wallet: z.string(),
  network: z.string(),
});

// User schema
export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string().optional(),
  age: z.number(),
  gender: z.enum(["male", "female"]),
  email: z.string().email(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(),
  image: z.string().url(),
  bloodGroup: z.string(),
  height: z.number(),
  weight: z.number(),
  eyeColor: z.string(),
  hair: HairSchema,
  ip: z.string(),
  address: AddressSchema,
  macAddress: z.string(),
  university: z.string(),
  bank: BankSchema,
  company: CompanySchema,
  ein: z.string(),
  ssn: z.string(),
  userAgent: z.string(),
  crypto: CryptoSchema,
  role: z.string(),
});

// API Response schema
export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

// Inferred types
export type User = z.infer<typeof UserSchema>;
export type UsersResponse = z.infer<typeof UsersResponseSchema>;
export type Hair = z.infer<typeof HairSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Company = z.infer<typeof CompanySchema>;

// Search and filter types
export type SortField = keyof Pick<User, 'firstName' | 'lastName' | 'age' | 'email' | 'gender'>;
export type SortOrder = 'asc' | 'desc';

export const SearchParamsSchema = z.object({
  search: z.string().optional().transform(val => val === "" ? undefined : val),
  gender: z.string().optional().transform(val => val === "" ? undefined : val).pipe(z.enum(['male', 'female']).optional()),
  sortBy: z.string().optional().transform(val => val === "" ? undefined : val).pipe(z.enum(['firstName', 'lastName', 'age', 'email', 'gender']).optional()),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  limit: z.number().min(1).max(100).optional(),
  skip: z.number().min(0).optional(),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>; 