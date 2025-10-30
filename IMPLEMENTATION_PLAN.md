# Address Book App - Implementation Plan

## 📋 Overview

Building a beautiful address book app with tRPC, React Query, and Tailwind CSS featuring user listing, filtering, search, and todos management.

---

## 🎯 Step-by-Step Implementation

### **STEP 1: Database Optimization - Add Indices**

**Goal**: Optimize database queries for filtering and searching

**Tasks**:

- Add indices for filterable fields: `gender`, `hairColor`, `eyeColor`, `bloodGroup`
- Add indices for searchable fields: `firstName`, `lastName`, `email`, `phone`, `companyName`
- Update Prisma schema with `@@index` directives
- Run `prisma db push` to apply changes

**Files to modify**: `prisma/schema.prisma`

---

### **STEP 2: Create tRPC User Router**

**Goal**: Build comprehensive tRPC endpoints for user operations

**Tasks**:

- Create `src/server/api/routers/user.ts`
- Implement `getUsers` procedure with:
  - Pagination (skip, take)
  - Search functionality (name, email, phone, company)
  - Filters (gender, hairColor, eyeColor, bloodGroup)
  - Return total count for pagination
  - Return active filters for UI display
- Implement `getUserById` procedure for detail page
- Use Zod for input validation

**Files to create**: `src/server/api/routers/user.ts`
**Files to modify**: `src/server/api/root.ts` (add userRouter)

---

### **STEP 3: Update Todo Router**

**Goal**: Add CRUD operations to existing todo router

**Tasks**:

- Extend `src/server/api/routers/post.ts` or create new `todo.ts`
- Implement procedures:
  - `getTodosByUserId` - fetch todos for specific user
  - `createTodo` - create new todo
  - `updateTodo` - update todo text and completion status
  - `deleteTodo` - delete todo
  - `toggleTodo` - quick toggle completion
- Use Zod validation for all inputs

**Files to modify/create**: `src/server/api/routers/todo.ts`, `src/server/api/root.ts`

---

### **STEP 4: Create React Query Hooks**

**Goal**: Setup typed hooks for data fetching with proper caching

**Tasks**:

- Create `src/hooks/useUsers.ts`:
  - Hook for paginated user list with filters
  - Handle loading, error states
  - Type-safe with tRPC types
- Create `src/hooks/useUser.ts`:
  - Hook for single user detail
  - Enable/disable based on userId
- Create `src/hooks/useTodos.ts`:
  - Hooks for todos CRUD operations
  - Setup optimistic updates
  - Handle cache invalidation
- Configure React Query devtools

**Files to create**:

- `src/hooks/useUsers.ts`
- `src/hooks/useUser.ts`
- `src/hooks/useTodos.ts`

---

### **STEP 5: Create Shared UI Components**

**Goal**: Build reusable components with Tailwind

**Tasks**:

- Create `src/components/ui/Button.tsx` - styled button with variants
- Create `src/components/ui/Input.tsx` - search input with icon
- Create `src/components/ui/Select.tsx` - dropdown for filters
- Create `src/components/ui/Badge.tsx` - for displaying filtered values
- Create `src/components/ui/Spinner.tsx` - loading indicator
- Create `src/components/ui/Drawer.tsx` - slide-out drawer component
- Add hover effects and transitions

**Files to create**:

- `src/components/ui/Button.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Select.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Spinner.tsx`
- `src/components/ui/Drawer.tsx`

---

### **STEP 6: Build Users Table Component**

**Goal**: Create the main paginated table with dynamic columns

**Tasks**:

- Create `src/components/UserTable.tsx`
- Columns: Avatar, Name, Email, Phone, Company, Address, [Dynamic filtered columns]
- Add dynamic columns based on active filters
- Make rows clickable (navigate to user detail)
- Add hover effects and animations
- Handle loading skeleton
- Handle error state
- Show "no results" state

**Files to create**: `src/components/UserTable.tsx`

---

### **STEP 7: Build Search Bar Component**

**Goal**: Implement search with debouncing

**Tasks**:

- Create `src/components/SearchBar.tsx`
- Input with search icon
- Debounce search queries (300ms)
- Show clear button when active
- Display search summary (e.g., "Searching for 'john'")

**Files to create**: `src/components/SearchBar.tsx`

---

### **STEP 8: Build Filter Component**

**Goal**: Multi-filter dropdown interface

**Tasks**:

- Create `src/components/FilterPanel.tsx`
- Dropdown with:
  - Gender select (radio)
  - Hair Color select (with color badges)
  - Eye Color select (with color badges)
  - Blood Group select
- Show active filters as removable badges
- Clear all filters button
- Smooth open/close animations

**Files to create**: `src/components/FilterPanel.tsx`

---

### **STEP 9: Build Pagination Component**

**Goal**: User-friendly pagination controls

**Tasks**:

- Create `src/components/Pagination.tsx`
- Show: Previous, page numbers, Next
- Show "X-Y of Z users"
- Page size selector (10, 25, 50, 100)
- Disable buttons appropriately
- Smooth transitions

**Files to create**: `src/components/Pagination.tsx`

---

### **STEP 10: Build Main Users List Page**

**Goal**: Assemble all components into the main view

**Tasks**:

- Update `src/pages/index.tsx`
- Layout:
  - Header with app title
  - Search bar
  - Filter button/panel
  - Active filters badges
  - User table
  - Pagination
- Wire up all state management
- Handle URL query params for filters/search/pagination
- Add smooth page transitions

**Files to modify**: `src/pages/index.tsx`

---

### **STEP 11: Build User Detail Page**

**Goal**: Beautiful detailed view of user information

**Tasks**:

- Create `src/pages/users/[id].tsx`
- Layout sections:
  - Header with avatar, name, back button
  - Contact Information (email, phone, username)
  - Personal Details (age, gender, birth date, blood group)
  - Physical Attributes (height, weight, eye color, hair)
  - Address section (with coordinates visualization)
  - Company section
  - Education section (university)
  - Bank & Crypto (parsed from JSON)
  - Todos button (floating action button)
- Use cards/sections for organization
- Add loading skeleton
- Add error handling (user not found)
- Smooth animations on mount

**Files to create**: `src/pages/users/[id].tsx`

---

### **STEP 12: Build Todos Drawer**

**Goal**: Side drawer with full CRUD functionality

**Tasks**:

- Create `src/components/TodosDrawer.tsx`
- Features:
  - Slide in from right
  - Header with user name and close button
  - Add new todo input + button
  - Todo list with checkboxes
  - Edit todo (inline editing)
  - Delete todo (with confirmation)
  - Empty state
  - Loading state
  - Error handling
- Optimistic updates for instant feedback
- Smooth animations (slide, fade, checkbox)

**Files to create**: `src/components/TodosDrawer.tsx`

---

### **STEP 13: Setup React Query Configuration**

**Goal**: Optimize caching and invalidation strategies

**Tasks**:

- Update `src/pages/_app.tsx`
- Configure React Query:
  - Default stale time (5 minutes)
  - Default cache time (10 minutes)
  - Retry logic
  - Refetch on window focus (for users list only)
- Setup invalidation strategies:
  - Invalidate user list on todo changes
  - Invalidate user detail on todo changes
- Enable React Query Devtools in development

**Files to modify**: `src/pages/_app.tsx`

---

### **STEP 14: Add Loading & Error States**

**Goal**: Comprehensive UX for all states

**Tasks**:

- Create `src/components/LoadingState.tsx` - skeleton loaders
- Create `src/components/ErrorState.tsx` - error display with retry
- Create `src/components/EmptyState.tsx` - no results found
- Apply to all pages and components
- Add subtle animations

**Files to create**:

- `src/components/LoadingState.tsx`
- `src/components/ErrorState.tsx`
- `src/components/EmptyState.tsx`

---

### **STEP 15: Polish UI & Animations**

**Goal**: Make everything beautiful and smooth

**Tasks**:

- Add Tailwind CSS custom theme colors
- Implement consistent spacing and typography
- Add micro-interactions:
  - Button hover effects
  - Table row hover (slight elevation)
  - Smooth page transitions
  - Drawer slide animations
  - Filter dropdown animations
  - Loading spinner pulses
- Add responsive design (mobile, tablet, desktop)
- Test all animations for smoothness
- Add focus states for accessibility

**Files to modify**:

- `src/styles/globals.css`
- All component files

---

### **STEP 16: Final Testing & Optimization**

**Goal**: Ensure everything works perfectly

**Tasks**:

- Test all user flows:
  - Search → works with partial match
  - Filters → display correctly in table
  - Pagination → maintains filters/search
  - User detail → all data displays
  - Todos CRUD → all operations work
  - Cache invalidation → data stays synced
- Check performance:
  - Fast initial load
  - Smooth animations (60fps)
  - Efficient queries (check with Prisma logs)
- Test edge cases:
  - No results
  - Network errors
  - Long names/text overflow
- Fix any bugs found

---

## 📦 Summary

**Total Steps**: 16
**Estimated Files to Create**: ~20
**Estimated Files to Modify**: ~5

### Key Technologies:

- ✅ Next.js
- ✅ tRPC
- ✅ React Query
- ✅ Prisma
- ✅ Tailwind CSS
- ✅ TypeScript
- ✅ Zod

### Key Features:

- ✅ Paginated user list
- ✅ Multi-field search
- ✅ Multi-filter support
- ✅ Dynamic table columns
- ✅ User detail page
- ✅ Todos drawer with CRUD
- ✅ Optimistic updates
- ✅ Proper caching
- ✅ Beautiful UI
- ✅ Smooth animations

---

## 🚀 Ready to Start!

Begin with **STEP 1** and execute them in order. Each step builds upon the previous ones.
