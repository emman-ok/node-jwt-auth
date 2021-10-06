<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">My Account</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card>
        </template>
        <section class="page-section q-mb-md">
            <div class="container">
                <div class="row q-col-gutter-md">
                    <div class="col comp-grid">
                        <div class="">
                            <div>
                                <div v-if="!loading">
                                    <q-card class="q-pa-lg q-mb-md" flat>
                                        <div style="margin-top:60px" class="row q-col-gutter-lg">
                                            <div class="col-auto">
                                                <image-viewer :ratio="1/1" image-size="medium" :src="$UserPhoto"></image-viewer>
                                            </div>
                                            <div class="col">
                                                <div class="text-h4 text-primary"> {{ $UserName }} </div>
                                                <div class="text-caption"> {{ $UserEmail }} </div>
                                            </div>
                                        </div>
                                    </q-card>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-md-2 col-sm-3 col-12">
                                            <q-card    class="nice-shadow-10">
                                                <q-tabs vertical class="text-primary" dense v-model="tab" no-caps inline-label>
                                                    <q-tab name="accountview" icon="account_box" label="Account Detail" style="justify-content:initial" />
                                                    <q-tab name="accountedit" icon="edit" label="Edit Account" style="justify-content:initial" />
                                                    <q-tab name="changepassword" icon="lock" label="Change Password" style="justify-content:initial" />
                                                </q-tabs>
                                            </q-card>
                                        </div>
                                        <div class="col-md-10 col-sm-9 col-12">
                                            <q-card    class="nice-shadow-10 q-pa-sm">
                                                <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
                                                    <q-tab-panel name="accountview">
                                                        <div v-if="!loading && ready">
                                                            <q-item>
                                                                <q-item-section>
                                                                    <q-item-label caption>User Name: </q-item-label>
                                                                    <q-item-label>{{ item.user_name }}</q-item-label>
                                                                </q-item-section>
                                                            </q-item>
                                                            <q-separator></q-separator>
                                                            <q-item>
                                                                <q-item-section>
                                                                    <q-item-label caption>Email: </q-item-label>
                                                                    <q-item-label>{{ item.email }}</q-item-label>
                                                                </q-item-section>
                                                            </q-item>
                                                            <q-separator></q-separator>
                                                        </div>
                                                        <div v-if="loading" class="q-pa-sm text-center">
                                                            <q-spinner :size="40" color="accent" indeterminate></q-spinner>
                                                            Loading...
                                                        </div>
                                                    </q-tab-panel>
                                                    <q-tab-panel name="accountedit">
                                                        <div class="reset-grid">
                                                            <account-edit-page></account-edit-page>
                                                            </div>
                                                        </q-tab-panel>
                                                        <q-tab-panel name="changepassword">
                                                            <change-password-page></change-password-page>
                                                        </q-tab-panel>
                                                    </q-tab-panels>
                                                </q-card>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="q-pa-lg text-center">
                                        <q-spinner :size="50" color="accent" indeterminate></q-spinner>
                                        Loading...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </template>
    <script>
	import { PageMixin } from "../../mixins/page.js";
	import { ViewPageMixin } from "../../mixins/viewpage.js";
	import  AccountEditPage  from "./accountedit.vue";
	import  ChangePasswordPage  from "./changepassword.vue";
	export default {
		name: 'accountviewUsersPage',
		components: {
			AccountEditPage,
			ChangePasswordPage,
		},
		mixins: [PageMixin, ViewPageMixin ],
		props: {
			pageName: {
				type : String,
				default : 'users',
			},
			routeName : {
				type : String,
				default : 'usersaccountview',
			},
			pagePath: {
				type : String,
				default : 'account',
			},
			apiPath: {
				type : String,
				default : 'account',
			},
		},
		data() {
            return {
				item: {
					default :{
					},
				},
				tab: 'accountview',
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "My Account"
				}
			}
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		methods: {
		},
		watch: {
			$route (to, from){
				//only fetch data when navigated to this page
				if(to.name == this.routeName){
					this.load();
				}
			},
		},
	};
</script>
<style scoped>
</style>
