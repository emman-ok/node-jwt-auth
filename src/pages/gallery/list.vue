<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container-fluid">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">Gallery</div>
                                    <div class="text-caption text-grey"> Nice people all over the world </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-auto col-12 ">
                            <q-btn       :rounded="false"  size=""  color="primary" no-caps  unelevated   :to="`/gallery/add`" class="full-width">
                                <q-icon name="add"></q-icon>                                
                                Add New Gallery 
                            </q-btn>
                        </div>
                        <div class="col-md-auto col-12 ">
                            <q-input debounce="1000" outlined dense  placeholder="Search" v-model="searchText">
                            <template v-slot:append>
                                <q-icon name="search"></q-icon>
                            </template>
                            </q-input>
                        </div>
                    </div>
                </div>
            </q-card>
        </template>
        <section class="page-section q-mb-md">
            <div class="container-fluid">
                <div class="row q-col-gutter-md">
                    <div class="col comp-grid">
                        <div>
                            <q-chip v-if="searchText" icon="search" removable @remove="searchText='';$route.query.search=''">
                            Search: <strong class="q-ml-sm"> {{ searchText }} </strong>
                            </q-chip>
                        </div>
                        <div class="">
                            <div>
                                <template v-if="showBreadcrumbs">
                                    <q-breadcrumbs class="q-pa-md" v-if="searchText || fieldName">
                                        <template v-if="fieldName">
                                            <q-breadcrumbs-el v-if="$route.query.tag" icon="arrow_back" class="text-capitalize" :label="$route.query.tag" to="/gallery"></q-breadcrumbs-el>
                                            <q-breadcrumbs-el v-else icon="arrow_back" class="text-capitalize" :label="fieldName|readable" to="/gallery"></q-breadcrumbs-el>
                                            <q-breadcrumbs-el v-if="$route.query.label" :label="$route.query.label"></q-breadcrumbs-el>
                                            <q-breadcrumbs-el v-else :label="fieldValue"></q-breadcrumbs-el>
                                        </template>
                                    </q-breadcrumbs>
                                </template>
                                <div class="relative-position">
                                    <template >
                                        <q-table :loading="loading" hide-bottom  grid card-container-class="justify-start q-col-gutter-md" 
                                        :columns="$menus.UsersTableHeaderItems" 
                                        :data="records" 
                                        row-key="gallery_id" 
                                        :pagination.sync="pagination"
                                        @request="setPagination" 
                                        no-data-label="No Record Found">
                                        <template v-slot:item="props">
                                            <div class="col-sm-3 col-md-2 col-12">
                                                <q-card :bordered="false" class="nice-shadow-3 animated fadeIn">
                                                    <q-img v-ripple @click="openPageDialog('gallery/view', `gallery/view/${props.row.gallery_id}`)" class="cursor-pointer" :ratio="1/1" :src="$utils.setImgUrl(props.row.photo, 'medium')">
                                                    <template v-slot:error>
                                                        <div class="absolute-full text-h2 text-bold flex flex-center bg-grey-3 text-grey-8">!</div>
                                                    </template>
                                                    </q-img>
                                                    <q-separator></q-separator>
                                                    <div class="row justify-between">
                                                        <div class="text-bold ellipsis q-pa-sm">{{ props.row.title }}</div>
                                                    </div>
                                                </q-card></div>
                                            </template>
                                            </q-table>
                                        </template>
                                        <template v-if="loading">
                                            <div class="q-my-md">
                                                <div class="row q-col-gutter-md">
                                                    <div v-for="n in 12" :key="n" class="col-md-2">
                                                        <q-card flat class="q-pa-md">
                                                            <q-skeleton height="150px" square />
                                                        </q-card>
                                                    </div>   
                                                </div>   
                                            </div>
                                            <div v-show="loading" class="load-indicator text-center text-grey q-pa-lg">
                                                <q-spinner color="primary" size="30px"> 
                                                </q-spinner>
                                                Loading...
                                            </div>
                                        </template>
                                        <div v-if="showFooter" class="">
                                            <div class="q-pa-sm q-my-md text-center">
                                                <q-btn v-if="canLoadMore && totalPages > 1" @click="load" glossy  flat :rounded="false"  size=""  color="primary" no-caps  unelevated >  Load More 
                                                </q-btn>
                                                <div  class="text-caption" v-if="finishedLoading && records.length > recordCount">No more content to load</div>
                                            </div>
                                        </div>
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
	import { ListPageMixin } from "../../mixins/listpage.js";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'listGalleryPage',
		components: {
        },
		mixins: [PageMixin, ListPageMixin ],
		props: {
			primaryKey : {
				type : String,
				default : 'gallery_id',
			},
			pageName : {
				type : String,
				default : 'gallery',
			},
			routeName : {
				type : String,
				default : 'gallerylist',
			},
			apiPath : {
				type : String,
				default : 'gallery/index',
			},
			limit: {
				type: String,
				default: "12",
			},
			msgBeforeDelete: {
				type: String,
				default: "Are you sure you want to delete this record?",
			},
		},
		data() {
            return {
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					//set browser page title
					return "Gallery"
				}
			},
			records: {
				get: function () {
					return this.$store.getters["gallery/records"];
				},
				set: function (value) {
					this.$store.commit("gallery/setRecords", value);
				},
			},
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		watch: {
			filters: {
				handler: function (newValue, oldValue) {
					this.reload();
				},
				deep: true 
			},
			searchText: function(){
				this.reload();
			},
			$route (to, from){
				//only fetch data when navigated to this page
				if(to.name == this.routeName){
					this.load();
				}
			},
		},
		methods: {
			...mapActions("gallery", ["fetchRecords", "deleteRecord"]),
			load: function () {
			if (this.canLoadMore) {
				this.loading = true;
				let url = this.apiUrl;
				let payload = {
					url,
					merge: true
				}
				this.fetchRecords(payload).then(
					(response) => {
						this.loading = false;
						this.ready = true;
						this.totalRecords = response.total_records;
						this.recordCount = response.record_count;
						this.pagination.rowsNumber = this.totalRecords;
						this.pagination.page++;
					},
					(response) => {
						this.loading = false;
						this.showPageRequestError(response);
					}
				);
			}
        },
		},
	};
</script>
<style scoped>
</style>
