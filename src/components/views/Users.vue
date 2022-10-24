<template>
  <div class="awesome-users">
    <div class="row-item">
      <awesome-button @click="newUser" :icon="faUserPlus" label="Add User" />
    </div>

    <div class="awesome-user-list">
      <div v-if="(users as User[]).length < 1" class="my-awesome-placeholder">
        <font-awesome-icon
          size="lg"
          :icon="faUserFriends"
          class="placehoder-icon"
        />
        <span>No user added !!</span>
      </div>
      <div
        class="awesome-user-item"
        v-for="(item, i) of (users as User[])"
        :key="i"
      >
        <div class="awesome-display-mode">
          <font-awesome-icon
            :icon="faUserNinja"
            size="lg"
            class="awesome-icon"
          />
          <div>{{ item.firstName }} {{ item.lastName }}</div>
          <div class="some-actions">
            <awesome-button
              :icon="faPaintBrush"
              class="remove-awesome-todo"
              @click="remove(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { User } from "@Types/types";
import {
  faPaintBrush,
  faUserFriends,
  faUserNinja,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispath, useSelector } from "@Store/react-redux/utils";
import { removeUser } from "@Store/react-redux/dataSlices";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {},
  setup(props, { emit }) {
    const router = useRouter();
    const users = useSelector((state) => state.users);
    const dispatch = useDispath();

    const remove = (user: User) => {
      dispatch(removeUser(user));
    };

    const newUser = () => {
      router.push("/user");
    };

    return {
      users,
      remove,
      faPaintBrush,
      faUserFriends,
      faUserNinja,
      faUserPlus,
      newUser,
    };
  },
});
</script>
<style lang="scss" scoped>
.awesome-users {
  transition: all 0.25s ease;
  width: 60vw;
  & .awesome-user-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
  }
  & .awesome-user-item {
    margin-top: 1rem;
    padding: 2rem;
    width: 80%;
    border: 2px solid rgba(148, 104, 254, 0.4);
    border-bottom-left-radius: 18px;
    border-top-right-radius: 18px;
    font-size: 1.2rem;
  }
  & .awesome-icon {
    color: rgba(148, 104, 254);
    font-size: 1.8rem;
    opacity: 0.9;
  }
  & .awesome-display-mode {
    display: flex;
    justify-content: space-between;
  }
  & .my-awesome-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-gap: 1rem;
    font-size: 1.6rem;
    min-height: 100px;
  }
  & .placehoder-icon {
    color: rgba(148, 104, 254);
  }
}
.row-item {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
