<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">Gallery Details</div>
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
                                            <q-card :bordered="false" class="animated zoomIn">
                                                <q-img  class="" :ratio="16/9" :src="$utils.setImgUrl(item.photo, 'large')">
                                                <template v-slot:error>
                                                    <div class="absolute-full text-h2 text-bold flex flex-center bg-grey-3 text-grey-8">!</div>
                                                </template>
                                                </q-img>
                                                <q-separator></q-separator>
                                                <div class="row justify-between">
                                                    <div class="text-bold ellipsis q-pa-sm">{{ item.title }}</div>
                                                    <q-card-actions class="row q-col-gutter-xs justify-end">
                                                        <q-btn icon="menu" padding="xs" round flat color="grey">
                                                            <q-menu transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                                <q-list dense rounded nav>
                                                                    <template v-if="$can.isOwner(item.user_id)">
                                                                        <q-item link clickable v-ripple :to="`/gallery/edit/${item.gallery_id}`">
                                                                            <q-item-section>
                                                                                <q-icon color="positive"  size="sm" name="edit"></q-icon>
                                                                            </q-item-section>
                                                                            <q-item-section>Edit</q-item-section>
                                                                        </q-item>
                                                                    </template>
                                                                    <template v-if="$can.isOwner(item.user_id)">
                                                                        <q-item link clickable v-ripple @click="deleteItem(item.gallery_id)">
                                                                            <q-item-section>
                                                                                <q-icon color="negative"  size="sm" name="clear"></q-icon>
                                                                            </q-item-section>
                                                                            <q-item-section>Delete</q-item-section>
                                                                        </q-item>
                                                                    </template>
                                                                </q-list>
                                                            </q-menu>
                                                        </q-btn>
                                                    </q-card-actions>
                                                </div>
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
		name: 'viewGalleryPage',
		components: {
		},
		mixins: [PageMixin, ViewPageMixin ],
		props: {
			pageName: {
				type : String,
				default : 'gallery',
			},
			idName: {
				type: String,
				default: 'gallery_id',
			},
			routeName : {
				type : String,
				default : 'galleryview',
			},
			pagePath: {
				type : String,
				default : 'gallery/view',
			},
			apiPath: {
				type : String,
				default : 'gallery/view',
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
					return "Gallery Details"
				}
			}
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions("gallery", [ "fetchRecord", "deleteRecord"]),
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
