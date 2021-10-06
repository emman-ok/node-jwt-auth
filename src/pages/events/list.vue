<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container-fluid">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">Events</div>
                                    <div class="text-caption text-grey"> Click on the Calendar Date to Add New Event </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-auto col-12 ">
                            <q-btn       :rounded="false"  size=""  color="primary" no-caps  unelevated   :to="`/events/add`" class="full-width">
                                <q-icon name="add"></q-icon>                                
                                Add New Events 
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
                        <q-card   class="q-mb-sm q-pa-sm nice-shadow-10">
                            <div class="q-pa-sm">
                                <calendar v-if="ready" :records="records" event-add-page="events/add"
                                event-view-page="events/view"
                                default-view="month"
                                height="400px"
                                badge-classes="q-ma-xs text-center text-white bg-primary"
                                header-title="Events Calender"
                                :show-header="true"
                                id-field="event_id"
                                view-event-page-type="dialog"
                                add-event-page-type="dialog"
                                title-field="title"
                                start-date-field="start_date"
                                end-date-field="end_date"
                                icon-field="icon"
                                color-field="color"
                                header-class="text-primary"
                                :view-change="true"
                                :date-controls="true"
                                :max-days="14"
                                :mini-mode="false"
                                :view-options="[{value: 'week', label: 'Week'},{value: 'month', label: 'Month'},{value: 'week-agenda', label: 'Week-Agenda'}]"
                                :no-scroll="false"
                                :hour24-format="false"
                                today-icon="date_range" prev-day-icon="arrow_back" next-day-icon="arrow_forward">
                                </calendar>
                            </div>
                        </q-card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
	import Calendar from "../../components/Calendar.vue";
	import { PageMixin } from "../../mixins/page.js";
	import { ListPageMixin } from "../../mixins/listpage.js";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: 'listEventsPage',
		components: {
			Calendar,
        },
		mixins: [PageMixin, ListPageMixin ],
		props: {
			primaryKey : {
				type : String,
				default : 'event_id',
			},
			pageName : {
				type : String,
				default : 'events',
			},
			routeName : {
				type : String,
				default : 'eventslist',
			},
			apiPath : {
				type : String,
				default : 'events/index',
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
					return "Events"
				}
			},
			records: {
				get: function () {
					return this.$store.getters["events/records"];
				},
				set: function (value) {
					this.$store.commit("events/setRecords", value);
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
			...mapActions("events", ["fetchRecords", "deleteRecord"]),
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
