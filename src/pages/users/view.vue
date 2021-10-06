<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">Users Details</div>
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
                                <div class="relative-position" style="min-height:200px">
                                    <template v-if="!loading && item">
                                        <div class="">
                                            <q-card :bordered="false"   class="text-center nice-shadow-10 animated zoomIn">
                                                <q-card-section >
                                                    <q-avatar  class="" size="100px">
                                                        <q-img :ratio="1/1" :src="$utils.setImgUrl(item.photo, 'large')">
                                                        <template v-slot:error>
                                                            <div class="absolute-full text-h2 text-bold flex flex-center bg-grey-3 text-grey-8">!</div>
                                                        </template>
                                                        </q-img>    
                                                    </q-avatar>
                                                </q-card-section>
                                                <q-card-section  class="">
                                                    <div class="text-bold ellipsis">{{ item.user_name }}</div>
                                                    <div class="text-caption ellipsis">{{ item.email }}</div>
                                                </q-card-section>
                                                <q-separator></q-separator>
                                            </q-card></div>
                                            <div class="row items-center justify-center q-my-md">
                                                <div  class="col-md-auto">
                                                    <q-btn class="q-mx-md" :disabled="!item.previousRecordId" @click="moveToPreviousRecord()" icon="arrow_back"   color="primary"  glossy  flat :rounded="false"  no-caps  unelevated  >
                                                    </q-btn>
                                                </div>
                                                <div class="col-md-auto">
                                                    <q-btn  class="q-mx-md" :disabled="!item.nextRecordId" @click="moveToNextRecord()" icon-right="arrow_forward"  color="primary"  glossy  flat :rounded="false"  no-caps  unelevated  >
                                                    </q-btn>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="loading">
                                            <div class="q-my-md">
                                                <q-markup-table flat>
                                                <tbody>
                                                    <tr v-for="n in 5" :key="n">
                                                        <td class="text-left" style="width:40px">
                                                            <q-skeleton type="QAvatar" width="30px" height="30px" />
                                                        </td>
                                                        <td class="text-left"  style="width:90px">
                                                            <q-skeleton  type="text" width="80px" />
                                                        </td>
                                                        <td class="text-right">
                                                            <q-skeleton type="text" width="250px" height="40px" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                </q-markup-table>
                                            </div>
                                            <div class="q-pa-sm text-center">
                                                <q-inner-loading :showing="loading">
                                                    <q-spinner :size="40" color="primary" indeterminate>
                                                    </q-spinner>
                                                </q-inner-loading>
                                            </div>
                                        </template>
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
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'viewUsersPage',
		components: {
		},
		mixins: [PageMixin, ViewPageMixin ],
		props: {
			pageName: {
				type : String,
				default : 'users',
			},
			idName: {
				type: String,
				default: 'user_id',
			},
			routeName : {
				type : String,
				default : 'usersview',
			},
			pagePath: {
				type : String,
				default : 'users/view',
			},
			apiPath: {
				type : String,
				default : 'users/view',
			},
		},
		data() {
            return {
				item: {
					default :{
					},
				},
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "Users Details"
				}
			}
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions("users", [ "fetchRecord", "deleteRecord"]),
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
