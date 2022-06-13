import {UserRole} from '../../../enums/UserRole.enum'
import {UserStatus} from '../../../enums/UserStatus.enum'

export interface UserModel {
  id: number
  name: string
  password: string | undefined
  email: string
  avatar_id: string
  status: UserStatus
  role: UserRole
  force_change_password: 0 | 1
  created_at: Date
  updated_at: Date
  avatar: string
}
