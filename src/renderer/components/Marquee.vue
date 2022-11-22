<template>
  <div class="xl-marquee" ref="marqueeDom">
    <p class="xl-marquee-wrapper" ref="wrapperDom" v-html="marqueeHtml"></p>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
const props = defineProps({
  content: {
    type: [String, Array],
    default: ''
  },
  speed: {
    type: [Number, String],
    default: 3
  },
  interval: {
    type: Number,
    default: 150
  },
  delay: {
    type: Number,
    default: 0
  }
});
const marqueeDom = ref(null);
const wrapperDom = ref(null);

const marqueeHtml = computed(() => {
  let html;
  if (typeof props.content === 'string') {
    html = `<span class="marquee-item">${props.content}</span><span style="display: inline-block;width: ${props.interval}px"></span><span class="marquee-item">${props.content}</span>`;
  } else {
    let htmlItem = '';
    props.content.map((e, i) => {
      if (i < props.content.length - 1) {
        htmlItem += `<span>${e}</span><span style="display: inline-block;width: ${props.interval}px"></span>`;
      } else {
        htmlItem += `<span>${e}</span>`;
      }
    });
    html = `<span class="marquee-item">${htmlItem}</span></span><span style="display: inline-block;width: ${props.interval}px"></span><span class="marquee-item">${htmlItem}</span>`;
  }
  return html;
});
const animation = () => {
  const animations = require('create-keyframe-animation');
  const boxW = marqueeDom.value.offsetWidth;
  const textW = document.querySelector('.marquee-item').offsetWidth;
  let speed;
  if (props.speed < 1) {
    speed = 1;
  } else if (props.speed > 5) {
    speed = 5;
  } else speed = props.speed;
  const duration = ((textW + props.interval) / 1000) * (30000 / speed);
  console.log('---:', textW, boxW);
  if (textW > boxW) {
    // 需要滚动
    animations.registerAnimation({
      name: 'marquee',
      animation: {
        0: {
          left: 0
        },
        100: {
          left: `-${textW + props.interval}px`
        }
      },
      // optional presets for when actually running the animation
      presets: {
        duration: duration,
        easing: 'linear',
        delay: props.delay,
        iterations: 'infinite'
      }
    });
    animations.runAnimation(wrapperDom.value, 'marquee');
  }
};

onMounted(() => {
  animation();
});
</script>
<style lang="scss" scoped>
.xl-marquee {
  overflow: hidden;
  width: 100%;
}
.xl-marquee-wrapper {
  white-space: nowrap;
  position: relative;
  float: left;
  left: 0;
}
</style>