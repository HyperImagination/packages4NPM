var messageBox = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"mask",staticClass:"sh-mask"},[_c('div',{ref:"container",staticClass:"sh-container"},[_c('div',{staticClass:"sh-header"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{staticClass:"sh-content"},[_vm._v(_vm._s(_vm.message))]),_vm._v(" "),_c('div',{staticClass:"sh-footer"},[(_vm.showCancelButton)?_c('div',{staticClass:"sh-button",staticStyle:{"color":"#717171"},on:{"click":_vm.clickHandler.cancel}},[_vm._v(_vm._s(_vm.cancelButtonText))]):_vm._e(),_vm._v(" "),(_vm.showConfirmButton)?_c('div',{staticClass:"sh-button",on:{"click":_vm.clickHandler.confirm}},[_vm._v(_vm._s(_vm.confirmButtonText))]):_vm._e()])])])},
staticRenderFns: [],
    data() {
      return {
        clickHandler: {
          cancel() {},
          confirm() {}
        },
        title: '',
        message: '',
        showConfirmButton: true, // 是否显示确认按钮
        showCancelButton: false, // 是否显示取消按钮
        confirmButtonText: '', // 确认按钮的文本
        cancelButtonText: '' // 取消按钮的文本
      };
    }
  };

// 遮罩动画
const fadeIn = {
    transform: 'translate3d(0, 0, 0)',
    opacity: 0
  };
const fadeOut = {
    transform: 'translate3d(0, 0, 0)',
    opacity: 1
  };
const scaleInStart = {
    transform: 'translate3d(0, 0, 0) scale(1.5)',
    opacity: 0
  };
const scaleInEnd = {
    transform: 'translate3d(0, 0, 0) scale(1)',
    opacity: 1
  };
const scaleOutStart = {
    transform: 'translate3d(0, 0, 0) scale(1)',
    opacity: 1
  };
const scaleOutEnd = {
    transform: 'translate3d(0, 0, 0) scale(.5)',
    opacity: 0
  };
const maskInConfig = {
    duration: 400,
    delay: 100,
    easing: 'cubic-bezier(.22,.67,.52,.92)',
    fill: 'forwards'
  };
const maskOutConfig = {
    duration: 400,
    delay: 100,
    easing: 'cubic-bezier(.22,.67,.52,.92)',
    fill: 'backwards'
  };
const containerInConfig = {
    duration: 500,
    easing: 'cubic-bezier(.22,.67,.52,.92)',
    fill: 'forwards'
  };
const containerOutConfig = {
    duration: 500,
    easing: 'cubic-bezier(.22,.67,.52,.92)',
    fill: 'backwards'
  };
const tasks = [];
let isShow = false;
let maskAnimate = null;
let containerAnimate = null;
var index = {
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

export default index;
//# sourceMappingURL=vue-messagebox-plugin.es.js.map
