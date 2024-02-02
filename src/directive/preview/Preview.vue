<script setup lang="ts">
import { inject, onMounted } from 'vue'
import { Carousel } from './carousel'

const previews = inject('previews')

onMounted(() => {
  getCarousel()
})

const getCarousel = () => {
  const root = document.querySelector('.carousel')
  new Carousel(root!)
}
</script>

<template>
  <div class="preview-wrapper">
    <div class="preview-mask"></div>
    <div class="preview-content">
      <article class="carousel">
        <div class="carousel-scroller scroller-snap scroller-behavior-smooth">
          <div v-for="(item, index) in previews" :key="index" class="carousel-snap">
            <figure class="carousel-snap__animate">
              <img :src="item" class="carousel-snap__image" decoding="async" loading="lazy" />
              <figcaption>
                <a href="javascript:void(0)" class="carousel-snap__link"></a>
              </figcaption>
            </figure>
          </div>
        </div>
        <div class="button-group">
          <button class="button-snap previous">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              />
            </svg>
          </button>
          <button class="button-snap next">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              />
            </svg>
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.preview-wrapper {
  overflow: hidden;
  position: fixed;
  inset: 0;
}
.preview-mask,
.preview-content {
  height: 100%;
  width: 100%;
}
.preview-mask {
  z-index: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.618);
}
.preview-content {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
}

.carousel {
  max-block-size: 80%;

  display: grid;
  grid-template-columns: auto 1fr auto;
}

.carousel-scroller {
  overflow-x: auto;
  overscroll-behavior: contain auto;

  grid-row: 1;
  grid-column: 1 / -1;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
}

.scroller-behavior-smooth {
  scroll-behavior: smooth;
}

.scroller-snap {
  scroll-snap-type: x mandatory;
}

.carousel-snap {
  scroll-snap-align: center;

  padding-block: auto;
  padding-inline: auto;
}

.carousel-snap__animate {
  overflow: hidden;

  height: 100%;
  margin: 0;
  /* border-radius: 2rem; */

  background-color: transparent;

  transition: transform 0.3s ease-in-out;
}

.carousel-snap:not(.in-active) .carousel-snap__animate {
  transform: scale(0.75);
}

.carousel-snap__image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;
}

.button-group {
  display: contents;
}

.button-snap {
  overflow: hidden;

  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  border: none;
  padding: 0.4rem;
  margin: 0 1rem;

  grid-row: 1;
  align-self: center;

  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);

  cursor: pointer;
  z-index: 99;
}

.button-snap svg {
  fill: #d2d2d2;
  stroke: #d2d2d2;
  transition: all 0.15s ease;
}

.button-snap:not(:where(.no-next, .no-previous)):hover svg {
  fill: #fff;
  stroke: #fff;
}

.previous {
  grid-column: 1;
}

.previous:not(.no-previous):hover svg {
  transform: translateX(-0.5rem);
}

.next {
  grid-column: 3;
}

.next:not(.no-next):hover svg {
  transform: translateX(0.5rem);
}
</style>
