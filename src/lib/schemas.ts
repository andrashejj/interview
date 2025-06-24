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

// User schema (for API compatibility)
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

// Database User schema (flattened for Prisma/SQLite)
export const DatabaseUserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string().nullable(),
  age: z.number(),
  gender: z.string(),
  email: z.string().email(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(),
  image: z.string(),
  bloodGroup: z.string(),
  height: z.number(),
  weight: z.number(),
  eyeColor: z.string(),
  hairColor: z.string(),
  hairType: z.string(),
  ip: z.string(),
  macAddress: z.string(),
  university: z.string(),
  ein: z.string(),
  ssn: z.string(),
  userAgent: z.string(),
  role: z.string(),
  
  // Flattened address fields
  addressLine: z.string(),
  city: z.string(),
  state: z.string(),
  stateCode: z.string(),
  postalCode: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  
  // Flattened company fields
  companyName: z.string(),
  companyDepartment: z.string(),
  companyTitle: z.string(),
  companyAddress: z.string(),
  companyCity: z.string(),
  companyState: z.string(),
  companyPostal: z.string(),
  companyCountry: z.string(),
  
  // Flattened bank fields
  bankCardExpire: z.string(),
  bankCardNumber: z.string(),
  bankCardType: z.string(),
  bankCurrency: z.string(),
  bankIban: z.string(),
  
  // Flattened crypto fields
  cryptoCoin: z.string(),
  cryptoWallet: z.string(),
  cryptoNetwork: z.string(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Create User Input schema (for creating new users)
export const CreateUserSchema = DatabaseUserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update User Input schema (for updating users)
export const UpdateUserSchema = CreateUserSchema.partial();

// API Response schema
export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

// Utility function to convert database user to API user format
export const transformDatabaseUserToApiUser = (dbUser: DatabaseUser): User => {
  return {
    id: dbUser.id,
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    maidenName: dbUser.maidenName ?? undefined,
    age: dbUser.age,
    gender: dbUser.gender as "male" | "female",
    email: dbUser.email,
    phone: dbUser.phone,
    username: dbUser.username,
    password: dbUser.password,
    birthDate: dbUser.birthDate,
    image: dbUser.image,
    bloodGroup: dbUser.bloodGroup,
    height: dbUser.height,
    weight: dbUser.weight,
    eyeColor: dbUser.eyeColor,
    hair: {
      color: dbUser.hairColor,
      type: dbUser.hairType,
    },
    ip: dbUser.ip,
    address: {
      address: dbUser.addressLine,
      city: dbUser.city,
      state: dbUser.state,
      stateCode: dbUser.stateCode,
      postalCode: dbUser.postalCode,
      coordinates: {
        lat: dbUser.latitude,
        lng: dbUser.longitude,
      },
      country: dbUser.country,
    },
    macAddress: dbUser.macAddress,
    university: dbUser.university,
    bank: {
      cardExpire: dbUser.bankCardExpire,
      cardNumber: dbUser.bankCardNumber,
      cardType: dbUser.bankCardType,
      currency: dbUser.bankCurrency,
      iban: dbUser.bankIban,
    },
    company: {
      department: dbUser.companyDepartment,
      name: dbUser.companyName,
      title: dbUser.companyTitle,
      address: {
        address: dbUser.companyAddress,
        city: dbUser.companyCity,
        state: dbUser.companyState,
        stateCode: "", // Not stored separately
        postalCode: dbUser.companyPostal,
        coordinates: { lat: 0, lng: 0 }, // Not stored for company
        country: dbUser.companyCountry,
      },
    },
    ein: dbUser.ein,
    ssn: dbUser.ssn,
    userAgent: dbUser.userAgent,
    crypto: {
      coin: dbUser.cryptoCoin,
      wallet: dbUser.cryptoWallet,
      network: dbUser.cryptoNetwork,
    },
    role: dbUser.role,
  };
};

// Utility function to convert API user to database format
export const transformApiUserToDatabase = (apiUser: Omit<User, 'id'>): CreateUser => {
  return {
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    maidenName: apiUser.maidenName ?? null,
    age: apiUser.age,
    gender: apiUser.gender,
    email: apiUser.email,
    phone: apiUser.phone,
    username: apiUser.username,
    password: apiUser.password,
    birthDate: apiUser.birthDate,
    image: apiUser.image,
    bloodGroup: apiUser.bloodGroup,
    height: apiUser.height,
    weight: apiUser.weight,
    eyeColor: apiUser.eyeColor,
    hairColor: apiUser.hair.color,
    hairType: apiUser.hair.type,
    ip: apiUser.ip,
    addressLine: apiUser.address.address,
    city: apiUser.address.city,
    state: apiUser.address.state,
    stateCode: apiUser.address.stateCode,
    postalCode: apiUser.address.postalCode,
    country: apiUser.address.country,
    latitude: apiUser.address.coordinates.lat,
    longitude: apiUser.address.coordinates.lng,
    macAddress: apiUser.macAddress,
    university: apiUser.university,
    bankCardExpire: apiUser.bank.cardExpire,
    bankCardNumber: apiUser.bank.cardNumber,
    bankCardType: apiUser.bank.cardType,
    bankCurrency: apiUser.bank.currency,
    bankIban: apiUser.bank.iban,
    companyDepartment: apiUser.company.department,
    companyName: apiUser.company.name,
    companyTitle: apiUser.company.title,
    companyAddress: apiUser.company.address.address,
    companyCity: apiUser.company.address.city,
    companyState: apiUser.company.address.state,
    companyPostal: apiUser.company.address.postalCode,
    companyCountry: apiUser.company.address.country,
    ein: apiUser.ein,
    ssn: apiUser.ssn,
    userAgent: apiUser.userAgent,
    cryptoCoin: apiUser.crypto.coin,
    cryptoWallet: apiUser.crypto.wallet,
    cryptoNetwork: apiUser.crypto.network,
    role: apiUser.role,
  };
};

// Inferred types
export type User = z.infer<typeof UserSchema>;
export type DatabaseUser = z.infer<typeof DatabaseUserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
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