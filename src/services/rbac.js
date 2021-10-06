

import { Auth } from './auth';
import { utils } from '../utils';
export const rbac = {
	userRole: '',
	userId: '',
	userRolePages: [],
	init(){
		this.userRole = Auth.UserRole();
		this.userId = Auth.UserID();
		this.userRolePages = Auth.UserRolePages();
	},
	view(path){
		path = utils.trim(path, "/");
		let arrPath = path.split("/")
		let page =  arrPath[0];
		let action =  arrPath[1];
		if(!action || action == "index"){
			action = "list"
		}
		let pagePath = page + "/" + action;
		if(Array.isArray(this.userRolePages)){
			return this.userRolePages.includes(pagePath);
		}
		return false;
	},
	manage(recId){
		return this.userId == recId;
	}
}