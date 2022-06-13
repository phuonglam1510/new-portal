import {UserRole} from '../../enums/UserRole.enum'
import {UserStatus} from '../../enums/UserStatus.enum'
import {ID} from '../core/ID.type'

export class User {
  id?: ID
  name?: string
  avatar?: string
  email?: string
  position?: string
  role?: UserRole
  status: UserStatus = UserStatus.Active
  last_login?: string
  two_steps?: boolean
  created_at?: string
  online?: boolean
  password?: string
  initials?: {
    label: string
    state: string
  }

  public get roleName(): string {
    if (this.role === UserRole.SuperAdmin) {
      return 'Super Admin'
    }
    if (this.role === UserRole.Sale) {
      return 'Sale'
    }
    return 'Staff'
  }

  public get joinAt(): string {
    return this.created_at ? new Date(this.created_at).toLocaleString() : 'Unknown'
  }
}
