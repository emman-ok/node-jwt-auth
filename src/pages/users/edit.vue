<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">Edit Users</div>
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
                                                <div class="row">
                                                    <div class="col-sm-3 col-12">
                                                        User Name *
                                                    </div>
                                                    <div class="col-sm-9 col-12">
                                                        <check-duplicate v-model="formData.user_name" check-path="components_data/users_user_name_exist/" v-slot="checker">
                                                        <ValidationProvider :rules="{required:true}" name="User Name" v-slot="{ errors, invalid, validated }">
                                                            <q-input outlined dense  ref="ctrluser_name" @blur="checker.check" :loading="checker.loading" v-model="formData.user_name"  label="User Name" type="text" placeholder="Enter User Name"   list="user_name_list"  
                                                            class="" :error="(invalid && validated) || checker.exist" :error-message="errors[0] || 'Not available'">
                                                            </q-input>
                                                            <datalist id="user_name_list">
                                                            <option v-for="(menu, index) in $menus.user_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                            </datalist>
                                                        </ValidationProvider>
                                                        </check-duplicate>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="row">
                                                    <div class="col-sm-3 col-12">
                                                        Photo 
                                                    </div>
                                                    <div class="col-sm-9 col-12">
                                                        <ValidationProvider :rules="{}" name="Photo" v-slot="{ errors, invalid, validated }">
                                                            <div class="q-mb-sm">
                                                                <q-uploader-input :max-files="1" :max-file-size="3" accept=".jpg,.png,.gif,.jpeg" :multiple="false" square flat bordered style="width:100%" label="Choose files or drop files here" upload-path="fileuploader/upload/photo" v-model="formData.photo"></q-uploader-input>
                                                                <small class="q-pa-sm text-negative" v-if="invalid && validated">{{errors[0]}}</small>
                                                                <div class="q-pa-xs"><file-viewer removable v-model="formData.photo"></file-viewer></div>
                                                            </div>
                                                        </ValidationProvider>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="row">
                                                    <div class="col-sm-3 col-12">
                                                        Email Verified At 
                                                    </div>
                                                    <div class="col-sm-9 col-12">
                                                        <ValidationProvider :rules="{}" name="Email Verified At" v-slot="{ errors, invalid, validated }">
                                                            <q-input outlined dense  v-model="formData.email_verified_at" :error="invalid && validated" :error-message="errors[0]" >
                                                            <template v-slot:prepend>
                                                                <q-icon name="date_range" class="cursor-pointer">
                                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                                <q-date     mask="YYYY-MM-DD HH:mm" v-model="formData.email_verified_at" />
                                                                </q-popup-proxy>
                                                                </q-icon>
                                                            </template>
                                                            <template v-slot:append>
                                                                <q-icon name="access_time" class="cursor-pointer">
                                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                                <q-time v-model="formData.email_verified_at" mask="YYYY-MM-DD HH:mm" />
                                                                </q-popup-proxy>
                                                                </q-icon>
                                                            </template>
                                                            </q-input>
                                                        </ValidationProvider>
                                                    </div>
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
		name: 'editUsersPage',
		components: {
		},
		mixins: [PageMixin, EditPageMixin ],
		props: {
			pageName: {
				type: String,
				default: 'users',
			},
			idName: {
				type: String,
				default: 'user_id',
			},
			routeName: {
				type: String,
				default: 'usersedit',
			},
			pagePath: {
				type : String,
				default : 'users/edit',
			},
			apiPath: {
				type: String,
				default: 'users/edit',
			},
		},
		data() {
            return {
				formData: {
					user_name: "", photo: "", email_verified_at: "", 
				},
				email_verified_atPicker:false
        	}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "Edit Users"
				}
			}
		},
		meta () {
			return {
				title: this.pageTitle // set browser page title
			}
		},
		methods: {
			...mapActions('users', ['updateRecord', 'fetchRecord']),
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
							this.navigateTo(`/users`);
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
				this.formData = {user_name: "", photo: "", email_verified_at: "", };
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
