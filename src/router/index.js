import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
let routes = [
	{
		name: 'main',
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			
			{ path: '/users/', name: 'userslist', component: () => import('pages/users/list.vue'), props: true},
			{ path: '/users/(list|index)/:fieldName?/:fieldValue?', name: 'userslistfilter', component: () => import('pages/users/list.vue'), props: true},
			
	
			{ path: '/users/view/:id', name: 'usersview', component: () => import('pages/users/view.vue'), props: true},
			{ path: '/index/register', name: 'usersuserregister' , component: () => import('pages/index/userregister.vue'), props: true},
			{ path: '/account/edit', name: 'usersaccountedit' , component: () => import('pages/account/accountedit.vue'), props: true},
			{ path: '/account', name: 'usersaccountview' , component: () => import('pages/account/accountview.vue'), props: true},
			{ path: '/users/add', name: 'usersadd' , component: () => import('pages/users/add.vue'), props: true},
			{ path: '/users/edit/:id' , name: 'usersedit' , component: () => import('pages/users/edit.vue') , props: true},
			{ path: '/events/', name: 'eventslist', component: () => import('pages/events/list.vue'), props: true},
			{ path: '/events/(list|index)/:fieldName?/:fieldValue?', name: 'eventslistfilter', component: () => import('pages/events/list.vue'), props: true},
			
	
			{ path: '/events/view/:id', name: 'eventsview', component: () => import('pages/events/view.vue'), props: true},
			{ path: '/events/add', name: 'eventsadd' , component: () => import('pages/events/add.vue'), props: true},
			{ path: '/events/edit/:id' , name: 'eventsedit' , component: () => import('pages/events/edit.vue') , props: true},
			{ path: '/gallery/', name: 'gallerylist', component: () => import('pages/gallery/list.vue'), props: true},
			{ path: '/gallery/(list|index)/:fieldName?/:fieldValue?', name: 'gallerylistfilter', component: () => import('pages/gallery/list.vue'), props: true},
			
	
			{ path: '/gallery/view/:id', name: 'galleryview', component: () => import('pages/gallery/view.vue'), props: true},
			{ path: '/gallery/add', name: 'galleryadd' , component: () => import('pages/gallery/add.vue'), props: true},
			{ path: '/gallery/edit/:id' , name: 'galleryedit' , component: () => import('pages/gallery/edit.vue') , props: true},

			
			{ path: '/index/forgotpassword', name: 'forgotpassword', component: () => import('pages/index/forgotpassword.vue'), props: true},
			{ path: '/index/resetpassword', name: 'resetpassword', component: () => import('pages/index/resetpassword.vue'), props: true},
			{ path: '/index/resetpassword_completed', name: 'resetpassword_completed', component: () => import('pages/index/resetpassword_completed.vue'), props: true},
	
			
			{ path: '/error/forbidden', component: () => import('pages/errors/forbidden.vue') },
			{ path: '/error/notfound', component: () => import('pages/errors/pagenotfound.vue') }
		]
	},
];


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default async function ({ store, ssrContext }) {
	let mainRoute = routes.find(x => x.name = "main");

	
	let loginToken = store.getters["auth/getLoginToken"];
	if(loginToken){
		try{
			await store.dispatch('auth/getUserData'); //get current user data from api on page load

			mainRoute.children.push({ path: '/(home)?', name: 'home', component: () => import('pages/home/home.vue') });
		}
		catch(e){
			/*
			 * getting current user detail failed
			 * token must be invalid
			*/
			mainRoute.children.push({ path: '/(index)?', name: 'index', component: () => import('pages/index/index.vue') });
		}
	}
	else{
		/*
		 * user has not loggedIn
		 * show login page
		*/
		mainRoute.children.push({ path: '/(index|home)?', name: 'index', component: () => import('pages/index/index.vue') });
	}


	// Always leave this as last one
	if (process.env.MODE !== 'ssr') {
		mainRoute.children.push({path: '*', component: () => import('pages/errors/pagenotfound.vue')});
	}

	const Router = new VueRouter({
		scrollBehavior: () => ({ x: 0, y: 0 }),
		routes,
		// Leave these as they are and change in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		mode: process.env.VUE_ROUTER_MODE,
		base: process.env.VUE_ROUTER_BASE
	});
	return Router
}