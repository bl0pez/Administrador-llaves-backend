import { Roles } from '@/utils/roles';
import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: Roles[]) => {
  return SetMetadata(META_ROLES, args);
};
