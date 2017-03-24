<template>
  <div ref="mask" class="sh-mask">
    <div ref="container" class="sh-container">
      <div class="sh-header">{{ title }}</div>
      <div class="sh-content">{{ message }}</div>
      <div class="sh-footer">
        <div v-if="showCancelButton" @click="clickHandler.cancel" style="color: #717171;" class="sh-button">{{ cancelButtonText }}</div>
        <div v-if="showConfirmButton" @click="clickHandler.confirm" class="sh-button">{{ confirmButtonText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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

</script>

<style>
  .sh-mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .3);
    opacity: 0;
    transform: translate3d(0, -100%, 0);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sh-container {
    width: 80%;
    min-height: 15%;
    max-height: 80%;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .sh-header {
    height: 3rem;
    font-size: 18px;
    line-height: 3rem;
    font-weight: bold;
  }
  .sh-content {
    min-height: 3rem;
    flex: 1;
    padding: .3rem;
    color: #999;
    overflow: auto;
  }
  .sh-footer {
    height: 2.5rem;
    line-height: 2.5rem;
    border-top: 1px solid #999;
    display: flex;
  }
  .sh-button {
    width: 1px;
    flex: 1;
    text-align: center;
    color: #0af;
  }
  .sh-button:nth-child(2n) {
    border-left: 1px solid #999;
  }
  .sh-button:active{
    opacity: .7;
  }
</style>