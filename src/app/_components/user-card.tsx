"use client";

import Image from "next/image";
import type { User } from "~/server/api/routers/users";
import { colors, spacing, borderRadius, shadow, typography, cn, transition } from "~/styles/design-tokens";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const getRoleBadgeClasses = (role: string) => {
    switch (role) {
      case 'admin':
        return cn(colors.status.error.bg, colors.status.error.text);
      case 'moderator':
        return cn(colors.status.warning.bg, colors.status.warning.text);
      default:
        return cn(colors.status.success.bg, colors.status.success.text);
    }
  };

  return (
    <div className={cn(
      colors.background.card,
      borderRadius.lg,
      shadow.md,
      shadow.hover,
      transition.shadow,
      'overflow-hidden'
    )}>
      <div className={cn(spacing.lg, 'sm:p-6')}>
        <div className={cn('flex flex-col sm:flex-row items-center sm:items-start', spacing.gap.lg, 'text-center sm:text-left')}>
          <Image
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            width={80}
            height={80}
            className={cn('object-cover flex-shrink-0', borderRadius.full)}
          />
          <div className="flex-1 min-w-0">
            <h3 className={cn(typography.heading.h3, colors.slate.text[900], 'break-words')}>
              {user.firstName} {user.lastName}
            </h3>
            <p className={cn(typography.body.sm, colors.slate.text[600], 'break-all mt-1')}>
              {user.email}
            </p>
            <div className={cn('mt-2 flex flex-wrap items-center justify-center sm:justify-start', spacing.gap.md, typography.body.sm, colors.slate.text[500])}>
              <span className="whitespace-nowrap">{user.age} years old</span>
              <span className="capitalize">{user.gender}</span>
            </div>
          </div>
        </div>
        
        <div className={cn('mt-4 space-y-2')}>
          <div className={cn(typography.body.sm, 'break-words')}>
            <span className={cn(typography.weight.medium, colors.slate.text[700])}>Company:</span>{" "}
            <span className={colors.slate.text[600]}>{user.company.name}</span>
          </div>
          <div className={cn(typography.body.sm, 'break-words')}>
            <span className={cn(typography.weight.medium, colors.slate.text[700])}>Department:</span>{" "}
            <span className={colors.slate.text[600]}>{user.company.department}</span>
          </div>
          <div className={cn(typography.body.sm, 'break-words')}>
            <span className={cn(typography.weight.medium, colors.slate.text[700])}>Location:</span>{" "}
            <span className={colors.slate.text[600]}>
              {user.address.city}, {user.address.state}, {user.address.country}
            </span>
          </div>
          <div className={cn(typography.body.sm, 'break-all')}>
            <span className={cn(typography.weight.medium, colors.slate.text[700])}>Phone:</span>{" "}
            <span className={colors.slate.text[600]}>{user.phone}</span>
          </div>
        </div>

        <div className={cn('mt-4 pt-4', colors.slate.border[200], 'border-t flex justify-center sm:justify-start')}>
          <span className={cn(
            'inline-flex items-center px-2.5 py-0.5',
            borderRadius.full,
            'text-xs',
            typography.weight.medium,
            getRoleBadgeClasses(user.role)
          )}>
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
} 