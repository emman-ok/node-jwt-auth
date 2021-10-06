<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">Edit Events</div>
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
                    <div class="col-md-9 col-12 comp-grid">
                        <q-card   class="q-pa-md nice-shadow-10">
                            <div>
                                <div v-if="!loading">
                                    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="startRecordUpdate()">
                                        <!--[form-content-start]-->
                                        <div class="row q-col-gutter-md">
                                            <div class="col-12">
                                                Title *
                                                <div id="ctrl-title-holder"> 
                                                    <ValidationProvider :rules="{required:true}" name="Title" v-slot="{ errors, invalid, validated }">
                                                        <q-input outlined dense  ref="ctrltitle" v-model="formData.title"  label="Title" type="text" placeholder="Enter Title"   list="title_list"  
                                                        class="" :error="invalid && validated" :error-message="errors[0]">
                                                        </q-input>
                                                        <datalist id="title_list">
                                                        <option v-for="(menu, index) in $menus.user_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                        </datalist>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                Start Date *
                                                <div id="ctrl-start_date-holder"> 
                                                    <ValidationProvider :rules="{required:true}" name="Start Date" v-slot="{ errors, invalid, validated }">
                                                        <q-input outlined dense  v-model="formData.start_date" :error="invalid && validated" :error-message="errors[0]" >
                                                        <template v-slot:prepend>
                                                            <q-icon name="date_range" class="cursor-pointer">
                                                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                            <q-date     mask="YYYY-MM-DD HH:mm" v-model="formData.start_date" />
                                                            </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                        <template v-slot:append>
                                                            <q-icon name="access_time" class="cursor-pointer">
                                                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                            <q-time v-model="formData.start_date" mask="YYYY-MM-DD HH:mm" />
                                                            </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                        </q-input>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                End Date 
                                                <div id="ctrl-end_date-holder"> 
                                                    <ValidationProvider :rules="{}" name="End Date" v-slot="{ errors, invalid, validated }">
                                                        <q-input outlined dense  v-model="formData.end_date" :error="invalid && validated" :error-message="errors[0]" >
                                                        <template v-slot:prepend>
                                                            <q-icon name="date_range" class="cursor-pointer">
                                                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                            <q-date     mask="YYYY-MM-DD HH:mm" v-model="formData.end_date" />
                                                            </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                        <template v-slot:append>
                                                            <q-icon name="access_time" class="cursor-pointer">
                                                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                            <q-time v-model="formData.end_date" mask="YYYY-MM-DD HH:mm" />
                                                            </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                        </q-input>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                Color 
                                                <div id="ctrl-color-holder"> 
                                                    <ValidationProvider :rules="{}" name="Color" v-slot="{ errors, invalid, validated }">
                                                        <q-select     outlined dense  ref="ctrlcolor" emit-value map-options  v-model="formData.color" :options="$menus.colorItems" label="Color"  :error="invalid && validated" :error-message="errors[0]" >
                                                        </q-select> 
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-12">
                                                Icon 
                                                <div id="ctrl-icon-holder"> 
                                                    <ValidationProvider :rules="{}" name="Icon" v-slot="{ errors, invalid, validated }">
                                                        <q-select     outlined dense  ref="ctrlicon" emit-value map-options  v-model="formData.icon" :options="$menus.iconItems" label="Icon"  :error="invalid && validated" :error-message="errors[0]" >
                                                        </q-select> 
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                Description 
                                                <div id="ctrl-description-holder"> 
                                                    <ValidationProvider :rules="{}" name="Description" v-slot="{ errors, invalid, validated }">
                                                        <q-input outlined dense  ref="ctrldescription" rows="5"  v-model="formData.description" placeholder="Enter Description"  type="textarea"  :error="invalid && validated" :error-message="errors[0]">
                                                        </q-input>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                        </div>
                                        <!--[form-content-end]-->
                                        <div v-if="showSubmitButton" class="text-center q-my-md">
                                            <q-btn    :rounded="false"  color="primary"  no-caps  unelevated   type="submit" :disabled="invalid" icon="send" :loading="saving">
                                                <q-spinner-oval slot="loading" /> Update
                                            </q-btn>
                                        </div>
                                    </ValidationObserver>
                                    <slot :submit="submit" :saving="saving"></slot>
                                </div>
                                <div v-else class="q-pa-sm text-center">
                                    <q-spinner
                                    :size="40"
                                    color="accent"
                                    indeterminate>
                                    </q-spinner>
                                    Loading...
                                </div>
                            </div>
                        </q-card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
	import { PageMixin } from "../../mixins/page.js";
	import { EditPageMixin } from "../../mixins/editpage.js";
	import { mapActions } from "vuex";
	export default {
		name: 'editEventsPage',
		components: {
		},
		mixins: [PageMixin, EditPageMixin ],
		props: {
			pageName: {
				type: String,
				default: 'events',
			},
			idName: {
				type: String,
				default: 'event_id',
			},
			routeName: {
				type: String,
				default: 'eventsedit',
			},
			pagePath: {
				type : String,
				default : 'events/edit',
			},
			apiPath: {
				type: String,
				default: 'events/edit',
			},
		},
		data() {
            return {
				formData: {
					title: "", start_date: "", end_date: "", color: "", icon: "", description: "", 
				},
				start_datePicker:false,end_datePicker:false
        	}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "Edit Events"
				}
			}
		},
		meta () {
			return {
				title: this.pageTitle // set browser page title
			}
		},
		methods: {
			...mapActions('events', ['updateRecord', 'fetchRecord']),
			async startRecordUpdate(){
				const isFormValid = await this.$refs.observer.validate();
				if(isFormValid){
					this.saving = true;
					let id = this.id;
					let url = this.apiUrl;
					let payload = this.normalizedFormData();
					let data = { id, url, payload }
					this.updateRecord(data).then(
						(response) => {
							this.saving = false;
							this.flashMsg(this.msgAfterUpdate);
							this.resetForm();
							this.closeDialogs();// close page dialog that if opened
							this.navigateTo(`/events`);
						},
						(response) => {
							this.saving = false;
							this.showPageRequestError(response);
						}
					);
				}
			},
			updateFormFields: function(){
				//update form fields value after load from api
				//e.g convert fieldvalue (value,value2,value2) to array 
            },
			resetForm (){
				//reset form fields value
				this.formData = {title: "", start_date: "", end_date: "", color: "", icon: "", description: "", };
				requestAnimationFrame(() => {
					this.$refs.observer.reset();
				});
				//raise event to reset other custom form components
				this.$EventBus.$emit("resetForm");
			},
		},
	};
</script>
<style scoped>
</style>
