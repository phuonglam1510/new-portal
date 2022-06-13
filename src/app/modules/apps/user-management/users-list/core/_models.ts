import {Builder} from 'builder-pattern'
import {UserStatus} from '../../../../../enums/UserStatus.enum'
import {GenericListResponse} from '../../../../../models/core/GenericListResponse.type'
import {User} from '../../../../../models/users/User.interface'

export type UsersQueryResponse = GenericListResponse<User>

export const initialUser: User = Builder(User, {
  avatar: 'avatars/300-6.jpg',
  position: 'Art Director',
  role: 1,
  name: '',
  email: '',
  password: 'admin1234',
  status: UserStatus.Active,
}).build()
