import { User } from "@Types/types";
import { reactive } from "vue";

export interface IUserProvider {
  setUser(user: User): void;
  getUser(): User;
  clearUser(): void;
}
/**Selected user */
const options = reactive({
  user: {} as User,
});

export const UserProvider: IUserProvider = {
  setUser(user: User) {
    options.user = user;
  },
  getUser() {
    return options.user;
  },
  clearUser() {
    options.user = {} as User;
  },
};

export const USER_PROVIDER_KEY = "userProvider";
