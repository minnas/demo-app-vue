<template>
  <div class="awesome-carousel">
    <div class="carousel-title">
      <font-awesome-icon
        :icon="faDharmachakra"
        size="lg"
        @click="spinMe"
        :spin="isSpinning"
      />
      <span>{{ t("carousel-page-title") }}</span>
    </div>
    <div class="my-content">
      <div class="my-scene">
        <div class="carousel" ref="carouselRef">
          <div
            class="carousel-item"
            v-for="(item, i) of awesomeCarousel"
            :key="i"
          >
            <font-awesome-icon
              :icon="item.data?.icon"
              size="lg"
              @click="goWhereYouLike(item.data?.path)"
            />
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <awesome-button :type="myBtnType" :icon="faArrowLeft" @click="goLeft" />
        <awesome-button
          :type="myBtnType"
          :icon="faArrowRight"
          @click="goRight"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  faDharmachakra,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonType } from "@Tools/settings";
import { carouselSlices, slides } from "@Utils/carousel";
import { CarouselSlice, NavItem } from "@Types/types";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    text: String,
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const router = useRouter();
    const carouselRef = ref();
    const isSpinning = ref(false);
    const currentPath = computed(() => router.currentRoute.value.name);

    const options = reactive({
      theta: 0,
      selected: 0,
      radius: 0,
    });

    const spinMe = () => {
      isSpinning.value = !isSpinning.value;
    };

    const goLeft = () => {
      options.selected = options.selected - 1;
      rotateCarousel();
    };

    const goRight = () => {
      options.selected = options.selected + 1;
      rotateCarousel();
    };

    const rotateCarousel = () => {
      const angle = options.theta * options.selected * -1;
      const style = `translateZ(${-options.radius}px) rotateY(${angle}deg)`;
      if (carouselRef.value) {
        carouselRef.value.style.transform = style;
      }
    };

    const awesomeCarousel: CarouselSlice[] = carouselSlices(
      210,
      140,
      slides.length
    ).map((s: CarouselSlice, index) => {
      return {
        ...s,
        data: slides[index],
      };
    });

    options.radius = awesomeCarousel[0].radius;
    options.theta = awesomeCarousel[0].theta;

    const goWhereYouLike = (path: string | undefined) => {
      if (path) {
        router.push(path);
      }
    };

    return {
      goWhereYouLike,
      router,
      currentPath,
      awesomeCarousel,
      myBtnType: ButtonType.ICON,
      faArrowRight,
      faArrowLeft,
      carouselRef,
      faDharmachakra,
      goLeft,
      goRight,
      spinMe,
      isSpinning,
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
.awesome-carousel {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
}

.my-scene {
  display: block;
  width: 210px;
  height: 140px;
  position: relative;
  perspective: 1000px;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translateZ(-288px);
  transform-style: preserve-3d;
  transition: transform 1s;
}
.carousel-item {
  position: absolute;
  width: 190px;
  height: 120px;
  left: 10px;
  top: 10px;
  border: 1px solid var(--shadow-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5.5rem;
  color: var(--highlight-color-9);
  & svg {
    cursor: pointer;
    &:hover {
      filter: drop-shadow(14px 15px 0px var(--shadow-color-7));
    }
  }
}
.carousel-item:nth-child(1) {
  transform: rotateY(0deg) translateZ(288px);
  background-color: var(--highlight-color-2);
}
.carousel-item:nth-child(2) {
  transform: rotateY(40deg) translateZ(288px);
  background-color: var(--highlight-color-3);
}
.carousel-item:nth-child(3) {
  transform: rotateY(80deg) translateZ(288px);
  background-color: var(--highlight-color-4);
}
.carousel-item:nth-child(4) {
  transform: rotateY(120deg) translateZ(288px);
  background-color: var(--highlight-color-5);
}
.carousel-item:nth-child(5) {
  transform: rotateY(160deg) translateZ(288px);
  background-color: var(--shadow-color-1);
}
.carousel-item:nth-child(6) {
  transform: rotateY(200deg) translateZ(288px);
  background-color: var(--shadow-color-2);
}
.carousel-item:nth-child(7) {
  transform: rotateY(240deg) translateZ(288px);
  background-color: var(--shadow-color-3);
}
.carousel-item:nth-child(8) {
  transform: rotateY(280deg) translateZ(288px);
  background-color: var(--shadow-color-4);
}
.carousel-item:nth-child(9) {
  transform: rotateY(320deg) translateZ(288px);
  background-color: var(--shadow-color-1);
}

.carousel-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column-gap: 2rem;
  z-index: 100;
}
.carousel-title {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-gap: 1rem;
  width: 100%;
  color: var(--highlight-color-9);
  border-bottom: 2px dashed var(--highlight-color-6);
  padding-bottom: 0.5rem;
  & svg {
    font-size: 3.5rem;
    cursor: pointer;
  }
  & span {
    font-size: 2rem;
    font-style: italic;
  }
}
.my-content {
  display: flex;
  flex-direction: column;
  grid-row-gap: 1rem;
  padding-top: 2rem;
}
</style>
