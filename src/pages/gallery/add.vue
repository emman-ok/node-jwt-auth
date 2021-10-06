<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md nice-shadow-10">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">Add New Gallery</div>
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
                                <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="startSaveRecord()" @reset="resetForm">
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
                                                        </div>
                                                        <!--photoDropOptions-->
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
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-sm-3 col-12">
                                                    User Id 
                                                </div>
                                                <div class="col-sm-9 col-12">
                                                    <ValidationProvider :rules="{}" name="User Id" v-slot="{ errors, invalid, validated }">
                                                        <q-input outlined dense  ref="ctrluser_id" v-model="formData.user_id"  label="User Id" type="none" placeholder="Enter User Id"   list="user_id_list"  
                                                        class="" :error="invalid && validated" :error-message="errors[0]">
                                                        </q-input>
                                                        <datalist id="user_id_list">
                                                        <option v-for="(menu, index) in $menus.user_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                        </datalist>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="showSubmitButton" class="text-center q-my-md">
                                        <q-btn type="submit"    :rounded="false"  color="primary"  no-caps  unelevated   :disabled="invalid" icon="send" :loading="saving">
                                            <q-spinner-oval slot="loading" /> Submit
                                        </q-btn>
                                    </div>
                                </ValidationObserver>
                                <slot :submit="submit" :saving="saving"></slot>
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
	import { AddPageMixin } from "../../mixins/addpage.js";
	import { mapActions } from "vuex";
	export default {
		name: 'addGalleryPage',
		components: {
		},
		mixins: [PageMixin, AddPageMixin ],
		props:{
			pageName : {
				type : String,
				default : 'gallery',
			},
			routeName : {
				type : String,
				default : 'galleryadd',
			},
			apiPath : {
				type : String,
				default : 'gallery/add',
			},
		},
		data() {
            return {
				formData: {
					photo: "", title: "", user_id: req.user.user_id, 
				},
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "Add New Gallery"
				}
			}
		},
		meta () {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions('gallery', ['saveRecord']),
			async startSaveRecord(){
				const isFormValid = await this.$refs.observer.validate();
				if(isFormValid){
					this.saving = true;
					let payload = this.normalizedFormData();
					let url = this.apiUrl;
					let data = { url, payload  }
					this.saveRecord(data).then((response) => {
						this.record = response.data;
						this.id = this.record['gallery_id'];
						this.saving = false;
						this.resetForm();
						this.closeDialogs();// close page dialog that if opened
						this.flashMsg(this.msgAfterSave);
						this.navigateTo(`/gallery`);
					},
					 (response) => {
						this.saving = false;
						this.showPageRequestError(response);
					});
				}
			},
			resetForm (){
				this.formData = {photo: "", title: "", user_id: req.user.user_id, };
				requestAnimationFrame(() => {
					this.$refs.observer.reset();
				});
				this.$EventBus.$emit("resetForm");
			},
		},
		mounted() {
		},
	};
</script>
<style scoped>
</style>
