import Vue from 'vue'
import Vuex from 'vuex'
import { pageComponents } from "./page_components.js"
import { auth } from "./auth.js"
import { users } from "./users.js"
import { events } from "./events.js"
import { gallery } from "./gallery.js"
Vue.use(Vuex)
export default function (/* { ssrContext } */) {
	const Store = new Vuex.Store({
		modules: {
			pageComponents,
			auth,
		users,
		events,
		gallery
		},
		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV
	})
	return Store
}