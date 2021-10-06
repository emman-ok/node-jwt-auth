<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">Events Details</div>
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
                                        <q-item>
                                            <q-item-section>
                                                <q-item-label caption>Title: </q-item-label>
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>{{ item.title }}</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                        <q-separator></q-separator>
                                        <q-item>
                                            <q-item-section>
                                                <q-item-label caption>Description: </q-item-label>
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>{{ item.description }}</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                        <q-separator></q-separator>
                                        <q-item>
                                            <q-item-section>
                                                <q-item-label caption>Start Date: </q-item-label>
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>
                                                    <q-chip v-if="item.start_date" dense size="13px" :label="item.start_date | relativeDate">
                                                    <q-tooltip
                                                    content-class="bg-accent"
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                    >
                                                    {{ item.start_date | humanDatetime}}
                                                    </q-tooltip>
                                                    </q-chip>
                                                </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                        <q-separator></q-separator>
                                        <q-item>
                                            <q-item-section>
                                                <q-item-label caption>End Date: </q-item-label>
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>
                                                    <q-chip v-if="item.end_date" dense size="13px" :label="item.end_date | relativeDate">
                                                    <q-tooltip
                                                    content-class="bg-accent"
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                    >
                                                    {{ item.end_date | humanDatetime}}
                                                    </q-tooltip>
                                                    </q-chip>
                                                </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                        <q-separator></q-separator>
                                        <q-card-actions class="row q-col-gutter-xs justify-end">
                                            <q-btn icon="menu" padding="xs" round flat color="grey">
                                                <q-menu transition-show="flip-right"  transition-hide="flip-left" self="center middle" anchor="center middle">
                                                    <q-list dense rounded nav>
                                                        <template v-if="$can.isOwner(item.user_id)">
                                                            <q-item link clickable v-ripple :to="`/events/edit/${item.event_id}`">
                                                                <q-item-section>
                                                                    <q-icon color="positive"  size="sm" name="edit"></q-icon>
                                                                </q-item-section>
                                                                <q-item-section>Edit</q-item-section>
                                                            </q-item>
                                                        </template>
                                                        <template v-if="$can.isOwner(item.user_id)">
                                                            <q-item link clickable v-ripple @click="deleteItem(item.event_id)">
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
		name: 'viewEventsPage',
		components: {
		},
		mixins: [PageMixin, ViewPageMixin ],
		props: {
			pageName: {
				type : String,
				default : 'events',
			},
			idName: {
				type: String,
				default: 'event_id',
			},
			routeName : {
				type : String,
				default : 'eventsview',
			},
			pagePath: {
				type : String,
				default : 'events/view',
			},
			apiPath: {
				type : String,
				default : 'events/view',
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
					return "Events Details"
				}
			}
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions("events", [ "fetchRecord", "deleteRecord"]),
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
