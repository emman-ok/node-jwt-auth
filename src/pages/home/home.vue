<template>
    <q-page  class="main-page">
        <section class="page-section q-pa-md">
            <div class="container">
                <div class="row q-col-gutter-md">
                    <div class="col comp-grid">
                        <div class="row  items-center q-col-gutter-sm q-px-sm">
                            <div class="col">
                                <div class="text-h6 text-bold">Dashboard / Home</div>
                                <div class="text-caption text-grey"> Drag and drop nice components onto this page </div>
                            </div>
                        </div>
                        <q-separator class="q-my-sm"></q-separator>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section q-mt-md q-mb-md">
            <div class="container">
                <div class="row q-col-gutter-md">
                    <div class="col-md-3 col-12 comp-grid">
                        <record-count api-path="components_data/getcount_users" max="" v-slot="record">
                        <q-btn align="left"  unelevated   push :rounded="false"  block no-caps text-color="dark" color="white" to="users" padding="md" class="full-width animated zoomIn">
                            <q-icon class=" q-mr-md" color="dark" style="opacity:0.7" size="30px" name="account_circle"></q-icon>
                            <div class="flex-column text-left">
                                <div class="text-bold">Users</div>
                                <div class="text-caption">Total Users</div>
                            </div>
                            <div class="text-h5 absolute-top-right q-ma-sm q-mt-lg">
                                <span v-if="!record.loading">{{ record.num }}</span>
                                <q-spinner v-else size="14px" />
                            </div>
                        </q-btn>
                        </record-count>
                    </div>
                    <div class="col-md-3 col-12 comp-grid">
                        <record-count api-path="components_data/getcount_gallery" max="" v-slot="record">
                        <q-btn align="left"  unelevated   push :rounded="false"  block no-caps text-color="dark" color="white" to="gallery" padding="md" class="full-width animated zoomIn">
                            <q-icon class=" q-mr-md" color="info" style="opacity:0.7" size="30px" name="image"></q-icon>
                            <div class="flex-column text-left">
                                <div class="text-bold">Gallery</div>
                                <div class="text-caption">Total Gallery</div>
                            </div>
                            <div class="text-h5 absolute-top-right q-ma-sm q-mt-lg">
                                <span v-if="!record.loading">{{ record.num }}</span>
                                <q-spinner v-else size="14px" />
                            </div>
                        </q-btn>
                        </record-count>
                    </div>
                    <div class="col-md-3 col-12 comp-grid">
                        <record-count api-path="components_data/getcount_upcomingevents" max="" v-slot="record">
                        <q-btn align="left"  unelevated   push :rounded="false"  block no-caps text-color="dark" color="white" to="events" padding="md" class="full-width animated zoomIn">
                            <q-icon class=" q-mr-md" color="positive" style="opacity:0.9" size="30px" name="developer_board"></q-icon>
                            <div class="flex-column text-left">
                                <div class="text-bold">Upcoming Events</div>
                                <div class="text-caption">Total Upcoming Events</div>
                            </div>
                            <div class="text-h5 absolute-top-right q-ma-sm q-mt-lg">
                                <span v-if="!record.loading">{{ record.num }}</span>
                                <q-spinner v-else size="14px" />
                            </div>
                        </q-btn>
                        </record-count>
                    </div>
                    <div class="col-md-3 col-12 comp-grid">
                        <record-count api-path="components_data/getcount_pastevents" max="" v-slot="record">
                        <q-btn align="left"  unelevated   push :rounded="false"  block no-caps text-color="dark" color="white" to="events" padding="md" class="full-width animated zoomIn">
                            <q-icon class=" q-mr-md" color="negative" style="opacity:0.9" size="30px" name="event_busy"></q-icon>
                            <div class="flex-column text-left">
                                <div class="text-bold">Past Events</div>
                                <div class="text-caption">Total Past Events</div>
                            </div>
                            <div class="text-h5 absolute-top-right q-ma-sm q-mt-lg">
                                <span v-if="!record.loading">{{ record.num }}</span>
                                <q-spinner v-else size="14px" />
                            </div>
                        </q-btn>
                        </record-count>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section q-mt-md">
            <div class="container">
                <div class="row q-col-gutter-md">
                    <div class="col comp-grid">
                        <div class="q-my-md">
                            <api-data-source   api-path="components_data/home_data_repeater"  v-slot="req">
                                <div class="row  items-center q-col-gutter-sm q-px-sm">
                                    <div class="col-auto">
                                        <q-avatar class="q-mr-sm" font-size="29px" size="40px" color="grey-2" text-color="primary" icon="event_available" />
                                        </div>
                                        <div class="col">
                                            <div class="text-bold">Upcoming Events</div>
                                            <div class="text-caption text-grey"> New Upcoming events </div>
                                        </div>
                                    </div>
                                    <div>
                                        <template v-if="!req.loading">
                                            <!-- Template to display each record -->
                                            <div class="row q-col-gutter-md">
                                                <div class="col-md-4" v-for="(data, i) in req.response" :key="i">
                                                    <q-card  :bordered="false" class="nice-shadow-10 animated zoomIn">
                                                        <q-item>
                                                            <q-item-section  avatar>
                                                                <q-avatar v-if="data.icon" class="cursor-pointer" :color="data.color" :icon="data.icon" v-ripple @click="navigateTo(`/events/view/${data.event_id}`)"  size="50px"></q-avatar>
                                                                <q-avatar v-else class="cursor-pointer" icon="event" v-ripple @click="navigateTo(`/events/view/${data.event_id}`)"  size="50px"></q-avatar>
                                                            </q-item-section>
                                                            <q-item-section>
                                                                <q-item-label v-ripple @click="navigateTo(`/events/view/${data.event_id}`)" class="text-primary text-bold cursor-pointer" lines="2">{{ data.title }}</q-item-label>
                                                            </q-item-section>
                                                            <q-item-section side top class="text-right">
                                                                <q-item-label caption>{{ data.start_date|relativeDate }} </q-item-label>
                                                            </q-item-section>
                                                        </q-item>
                                                    </q-card>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <!-- Loading -->
                                            <div class="text-center">
                                                <q-spinner size="30px" />
                                            </div>
                                        </template>
                                    </div>
                                </api-data-source>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </q-page>
    </template>
    <script>
	import { PageMixin } from "../../mixins/page.js";
	export default {
		name: 'HomeComponent',
		components: {
		},
		mixins: [PageMixin ],
		props: {
		},
		data: function() {
			return {
				ready: false,
			}
		},
		methods: {
		},
		mounted: function(){
			this.ready = true;
		}
	};
</script>
