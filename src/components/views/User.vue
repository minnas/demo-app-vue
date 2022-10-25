<template>
  <div class="some-user-info">
    <div class="header-row">
      <span>User Details</span>
      <awesome-button @click="close()" :icon="faTimes" :type="myBtnType" />
    </div>
    <div class="row">
      <label for="firstname">First Name:</label>
      <input
        name="firstname"
        type="text"
        v-model="firstName"
        autocomplete="false"
      />
    </div>
    <div class="row">
      <label for="lastname">Last Name:</label>
      <input
        name="lastname"
        type="text"
        v-model="lastName"
        autocomplete="false"
      />
    </div>
    <div class="row">
      <label for="nick">Nick (Optional):</label>
      <input name="nick" type="text" v-model="nick" autocomplete="false" />
    </div>
    <div class="row">
      <label for="email">Email:</label>
      <input name="email" type="email" v-model="email" autocomplete="false" />
    </div>
    <div class="row">
      <label for="password">Password:</label>
      <input
        name="password"
        type="password"
        v-model="password"
        autocomplete="false"
      />
    </div>
    <div class="row">
      <awesome-button
        @click="add()"
        :icon="faPlus"
        :type="myBtnType"
        :disabled="!isDetailsValid"
        label="Save"
      />
      <awesome-button @click="clear()" :icon="faRepeat" :type="myBtnType" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, toRefs, inject } from "vue";
import { useRouter } from "vue-router";
import { faPlus, faRepeat, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ButtonType } from "@Tools/settings";
import { useDispath } from "@Store/react-redux/utils";
import { addUser, updateUser } from "@Store/react-redux/dataSlices";
import { User } from "@Types/types";
import { IUserProvider, USER_PROVIDER_KEY } from "@Provider/user";

export default defineComponent({
  props: {
    text: String,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const dispatch = useDispath();
    const userProvider = inject<IUserProvider>(USER_PROVIDER_KEY);

    const details = reactive({
      firstName: userProvider?.getUser()?.firstName || "",
      lastName: userProvider?.getUser()?.lastName || "",
      nick: userProvider?.getUser()?.nick || "",
      email: userProvider?.getUser()?.email || "",
      password: userProvider?.getUser()?.password || "",
    });

    const add = () => {
      const id = userProvider?.getUser().id;
      if (id) {
        dispatch(updateUser({ ...details, id: id } as User));
      } else {
        dispatch(addUser(details as User));
      }
      userProvider?.clearUser();
      router.push("/users");
    };

    const close = () => {
      router.push("/users");
    };
    const clear = () => {
      details.firstName = "";
      details.lastName = "";
      details.nick = "";
      details.email = "";
      details.password = "";
    };
    const isValid = (value: string | undefined) => {
      if (value) {
        return value?.trim()?.length > 0;
      }
      return false;
    };

    const isDetailsValid = computed(
      () =>
        isValid(details?.firstName) &&
        isValid(details.lastName) &&
        isValid(details.email) &&
        isValid(details.password)
    );

    return {
      router,
      faPlus,
      faRepeat,
      faTimes,
      myBtnType: ButtonType.ICON,
      add,
      clear,
      close,
      isDetailsValid,
      ...toRefs(details),
    };
  },
});
</script>
<style lang="scss" scoped>
.some-user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-row-gap: 1rem;
  width: 80%;
  max-width: 500px;
  border: 2px dashed rgba(255, 255, 255, 0.8);
  padding: 1rem 2rem;
  margin: auto;
  & .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    grid-column-gap: 1rem;
    width: 100%;
    & label {
      font-weight: 600;
      font-size: 1.2rem;
      flex: 1;
    }
    & input {
      flex: 2;
      padding: 0.5rem;
    }
  }
  & .header-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px dashed rgba(255, 255, 255, 0.8);
    padding: 1rem 0;
    & span {
      font-style: italic;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
}
</style>
