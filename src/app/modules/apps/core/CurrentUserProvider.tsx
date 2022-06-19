import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../setup";
import { UserModel } from "../../auth/models/UserModel";

export const useCurrentUser = () =>
  useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel;
