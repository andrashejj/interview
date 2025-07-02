
export const colors = {
  primary: {
    50: 'bg-blue-50',
    100: 'bg-blue-100',
    500: 'bg-blue-500',
    600: 'bg-blue-600',
    hover: 'hover:bg-blue-600',
    text: 'text-blue-500',
    textOnPrimary: 'text-white',
    border: 'border-blue-500',
    ring: 'ring-blue-500',
  },
  slate: {
    50: 'bg-slate-50',
    100: 'bg-slate-100',
    200: 'bg-slate-200',
    300: 'bg-slate-300',
    400: 'bg-slate-400',
    600: 'bg-slate-600',
    700: 'bg-slate-700',
    900: 'bg-slate-900',
    text: {
      400: 'text-slate-400',
      500: 'text-slate-500',
      600: 'text-slate-600',
      700: 'text-slate-700',
      900: 'text-slate-900',
    },
    border: {
      200: 'border-slate-200',
      300: 'border-slate-300',
    },
    placeholder: 'placeholder-slate-500',
    hover: {
      200: 'hover:bg-slate-200',
    },
  },
  status: {
    error: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      hover: 'hover:bg-red-600',
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
    },
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
    },
  },
  white: {
    bg: 'bg-white',
    text: 'text-white',
  },
  background: {
    primary: 'bg-slate-50',
    secondary: 'bg-white',
    card: 'bg-white',
  },
};

export const spacing = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
  xl: 'p-6',
  '2xl': 'p-8',
  gap: {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-6',
  },
};

export const breakpoints = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
};

export const borderRadius = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export const shadow = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  hover: 'hover:shadow-lg',
};

export const transition = {
  default: 'transition-colors',
  shadow: 'transition-shadow duration-200',
  transform: 'transition-transform',
};

export const focus = {
  ring: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  inputRing: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  minimal: 'focus:outline-none focus:ring-1 focus:ring-blue-100 focus:ring-offset-0',
};

export const typography = {
  heading: {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-lg font-semibold',
  },
  body: {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  },
  weight: {
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
};

export const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const buttonVariants = {
  filter: (active: boolean) =>
    cn(
      'px-3 py-1 whitespace-nowrap',
      typography.body.sm,
      borderRadius.md,
      transition.default,
      focus.ring,
      active
        ? cn(colors.primary[500], colors.primary.textOnPrimary, colors.primary.hover)
        : cn(colors.white.bg, colors.slate.text[700], colors.slate.hover[200])
    ),
  sort: (active: boolean) =>
    cn(
      'px-3 py-1 whitespace-nowrap flex items-center',
      spacing.gap.xs,
      typography.body.sm,
      borderRadius.md,
      transition.default,
      focus.ring,
      active
        ? cn(colors.primary[500], colors.primary.textOnPrimary, colors.primary.hover)
        : cn(colors.white.bg, colors.slate.text[700], colors.slate.hover[200])
    ),
}; 