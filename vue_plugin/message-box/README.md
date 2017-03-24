## 说明

   这是针对集成了mint-ui的vue项目所需要的messagebox插件。mint-ui官方的messagebox组建有promise未及时close的问题，具体见官方issuse[] 
   
## 使用方法
   
   进入项目目录 
   
       cd  [your project]
       
   安装依赖 
   
       npm install 'vue-component-plugin'
   
   然后在main.js里面：
   
       import vueMessageBoxPlugin from 'vue-messagebox-plugin';
   
       import 'vue-messagebox-plugin/dist/vue-messagebox-plugin.cjs.css';
   
   在Vue实例之后：
   
        Vue.use(vueMessageBoxPlugin);
   
   最后在main.js以及.vue组件中分别使用
   
       Vue.MessageBox({
          title: '提示',
          message: 'nnnnnnnnnn',
          showConfirmButton: true,
          confirmButtonText: '知道了'
        })
    
    及
   
       this.$messagebox({
          title: '提示',
          message: 'nnnnnnnnnn',
          showConfirmButton: true,
          confirmButtonText: '知道了'
        })
    
   
