import messageBox from './message-box.vue';
// 遮罩动画
const fadeIn = {
    transform: 'translate3d(0, 0, 0)',
    opacity: 0
  },
  fadeOut = {
    transform: 'translate3d(0, 0, 0)',
    opacity: 1
  },
  // 对话框进入动画
  scaleInStart = {
    transform: 'translate3d(0, 0, 0) scale(1.5)',
    opacity: 0
  },
  scaleInEnd = {
    transform: 'translate3d(0, 0, 0) scale(1)',
    opacity: 1
  },
  // 对话框退出动画
  scaleOutStart = {
    transform: 'translate3d(0, 0, 0) scale(1)',
    opacity: 1
  },
  scaleOutEnd = {
    transform: 'translate3d(0, 0, 0) scale(.5)',
    opacity: 0
  },
  // 遮罩层动画配置
  maskInConfig = {
    duration: 400,
    delay: 100,
    easing: 'cubic-bezier(.22,.67,.52,.92)',
    fill: 'forwards'
  },
  maskOutConfig = {
    duration: 400,
    delay: 100,
    easing: 'cubic-bezier(.22,.67,.52,.92)',
    fill: 'backwards'
  },
  // 对话框动画配置
  containerInConfig = {
    duration: 500,
    easing: 'cubic-bezier(.22,.67,.52,.92)',
    fill: 'forwards'
  },
  containerOutConfig = {
    duration: 500,
    easing: 'cubic-bezier(.22,.67,.52,.92)',
    fill: 'backwards'
  },
  tasks = [];
let isShow = false, maskAnimate = null, containerAnimate = null;
export default {
  install(Vue) {
    // 初始化组件
    const MessageBox = Vue.extend(messageBox);
    const component = new MessageBox().$mount();
    document.getElementById('app').appendChild(component.$el);
    // 加入任务链
    const pushTask = (options = {}) => {
      options.title = options.title || '提示';
      options.message = options.message || '信息';
      options.showConfirmButton = typeof options.showConfirmButton === 'undefined' ? true : options.showConfirmButton;
      options.showCancelButton = typeof options.showCancelButton === 'undefined' ? false : options.showCancelButton;
      options.confirmButtonText = options.confirmButtonText || '确定';
      options.cancelButtonText = options.cancelButtonText || '取消';
      options.clickHandler = {};
      return new Promise((resolve, reject) => {
        options.clickHandler.confirm = () => {
          hide();
          resolve();
        };
        options.clickHandler.cancel = () => {
          hide();
          reject('cancel');
        };
        tasks.push(options);
        Vue.nextTick()
        .then(() => {
          showNext();
        });
      });
    };
    // 执行一个任务
    const show = item => {
      isShow = true;
      Object.keys(item).forEach(key => component[key] = item[key]);
      maskAnimate = component.$refs.mask.animate([fadeIn, fadeOut], maskInConfig);
      containerAnimate = component.$refs.container.animate([scaleInStart, scaleInEnd], containerInConfig);
    };
    // 执行下一个
    const showNext = () => {
      if (isShow) return;
      show(tasks[0]);
    };
    // 销毁一个任务
    const hide = () => {
      setTimeout(() => {
        // 清除之前的动画状态
        maskAnimate && maskAnimate.cancel();
        containerAnimate && containerAnimate.cancel();
        maskAnimate = component.$refs.mask.animate([fadeOut, fadeIn], maskOutConfig);
        containerAnimate = component.$refs.container.animate([scaleOutStart, scaleOutEnd], containerOutConfig);
        // 播放完毕触发
        containerAnimate.onfinish = () => {
          // 移除第一个
          tasks.shift();
          isShow = false;
          tasks.length >= 1 && showNext();
        };
      }, 100);
    };
    Vue.prototype.$messagebox = pushTask;
  }
};