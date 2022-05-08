import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from './components/Login.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Login.vue')

// import Home from './components/Home.vue'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Home.vue')
// import Welcome from './components/Welcome.vue'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ './components/Welcome.vue')


// import Users from './components/user/Users.vue'
const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/user/Users.vue')
// import Rights from './components/power/Rights'
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/power/Rights')
// import Roles from './components/power/Roles'
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ './components/power/Roles')


// import Cate from './components/goods/Cate'
const Cate = () => import(/* webpackChunkName: "Cate_Params" */ './components/goods/Cate')
// import Params from './components/goods/Params'
const Params = () => import(/* webpackChunkName: "Cate_Params" */ './components/goods/Params')


// import List from './components/goods/List'
const List = () => import(/* webpackChunkName: "List_Add" */ './components/goods/List')
// import Add from './components/goods/Add'
const Add = () => import(/* webpackChunkName: "List_Add" */ './components/goods/Add')


// import Order from './components/order/Order'
const Order = () => import(/* webpackChunkName: "Order_Report" */ './components/order/Order')
// import Report from './components/report/Report'
const Report = () => import(/* webpackChunkName: "Order_Report" */ './components/report/Report')

Vue.use(VueRouter)

const router= new VueRouter({
  routes:[
      {path:'/',redirect:'/login'},//路由重定向 自动跳转到登录页面
      {path:'/login',component:Login},
      {
        path:'/home',
        component:Home,
        redirect:'/Welcome',
        children:[
          {path:'/welcome',component:Welcome},
          {path:'/users',component:Users},
          {path:'/rights',component:Rights},
          {path:'/roles',component:Roles},
          {path:'/categories',component:Cate},
          {path:'/params',component:Params},
          {path:'/goods',component:List},
          {path:'/goods/add',component:Add},
          {path:'/orders',component:Order},
          {path:'/reports',component:Report},
      ]}
  ]
})

//路由守卫
router.beforeEach((to,from,next)=>{
    //to 将要访问的路径  from 代表从哪个路径跳转而来   next是一个函数，代表放行
    if(to.path==="/login") return next();//登录页直接放行
    //获取token 根据是否存在token再决定是否发生强制跳转
    const tokenStr=window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login') //字符串不存在，就没有登录，强制跳转到登录页
    next()
})


export default router
