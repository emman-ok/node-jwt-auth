import { utils } from '../utils';
import { ApiService } from '../services/api'
import { Auth } from '../services/auth'

export default async({ Vue, router }) => {
	const rbacPublicPages = ['/', '/index', '/error', '/home', '/account']; //all pages which do not need authorization
	let userPages = []
	let roleNames = []
	
	const canView = function(path){
		path = utils.trim(path, "/");
		let arrPath = path.split("/")
		let page =  arrPath[0];
		let action =  arrPath[1];
		if(!action || action == "index"){
			action = "list"
		}
		let pagePath = page + "/" + action;
		return userPages.includes(pagePath);
	}

	if(Auth.CheckLogin()){
		let url = "account/getuserpages";
		try{
			let response = await ApiService.get(url); //get list of pages user hass access to.
			let data =  response.data;
			userPages = data.pages;
			roleNames = data.roles;
		}
		catch(e){
			//console.error(e);
		}
		router.beforeEach((to, from, next) => {
			let path = utils.trim(to.path, "/");
			let page =  "/" + path.split("/")[0];
			const rbacRequired = !rbacPublicPages.includes(page);
			if (rbacRequired && !canView(path)) {
				return next({path: "/error/forbidden"});
			}
			next();
		})
	}
	
	Vue.prototype.$can = {view: canView, roleNames: roleNames};
}