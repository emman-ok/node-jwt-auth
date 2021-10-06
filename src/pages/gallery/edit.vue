<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">Edit Gallery</div>
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
                                                        Title 
                                                    </div>
                                                    <div class="col-sm-9 col-12">
                                                        <ValidationProvider :rules="{}" name="Title" v-slot="{ errors, invalid, validated }">
                                                            <q-input outlined dense  ref="ctrltitle" v-model="formData.title"  label="Title" type="text" placeholder="Enter Title"   list="title_list"  
                                                            class="" :error="invalid && validated" :error-message="errors[0]">
                                                            </q-input>
                                                            <datalist id="title_list">
                                                            <option v-for="(menu, index) in $menus.user_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                            </datalist>
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
		name: 'editGalleryPage',
		components: {
		},
		mixins: [PageMixin, EditPageMixin ],
		props: {
			pageName: {
				type: String,
				default: 'gallery',
			},
			idName: {
				type: String,
				default: 'gallery_id',
			},
			routeName: {
				type: String,
				default: 'galleryedit',
			},
			pagePath: {
				type : String,
				default : 'gallery/edit',
			},
			apiPath: {
				type: String,
				default: 'gallery/edit',
			},
		},
		data() {
            return {
				formData: {
					photo: "", title: "", 
				},
        	}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "Edit Gallery"
				}
			}
		},
		meta () {
			return {
				title: this.pageTitle // set browser page title
			}
		},
		methods: {
			...mapActions('gallery', ['updateRecord', 'fetchRecord']),
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
							this.navigateTo(`/gallery`);
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
				this.formData = {photo: "", title: "", };
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
