<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card   class="page-section q-py-sm q-px-md q-mb-md q-mb-md nice-shadow-10">
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col ">
                            <div class="row  items-center q-col-gutter-sm q-px-sm">
                                <div class="col">
                                    <div class="text-h6 text-primary">User registration</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-auto comp-grid">
                            <div class="">
                                <div class="">
                                    <div class="text-center">
                                        Already have an account?  <q-btn     :rounded="false"  no-caps  unelevated    color="primary" icon="account_box" to="/"> Login</q-btn>
                                    </div>
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
                                                Email *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <check-duplicate v-model="formData.email" check-path="components_data/users_email_exist/" v-slot="checker">
                                                <ValidationProvider :rules="{required:true, email:true}" name="Email" v-slot="{ errors, invalid, validated }">
                                                    <q-input outlined dense  ref="ctrlemail" @blur="checker.check" :loading="checker.loading" v-model="formData.email"  label="Email" type="email" placeholder="Enter Email"   list="email_list"  
                                                    class="" :error="(invalid && validated) || checker.exist" :error-message="errors[0] || 'Not available'">
                                                    </q-input>
                                                    <datalist id="email_list">
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
                                                Password 
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <ValidationProvider :rules="{}" name="Password" v-slot="{ errors, invalid, validated }">
                                                    <q-input outlined dense  ref="ctrlpassword" v-model="formData.password"  label="Password" :type="isPwd ? 'password' : 'text'" placeholder="Enter Password"   list="password_list"  
                                                    class="" :error="invalid && validated" :error-message="errors[0]">
                                                    <template v-slot:append>
                                                        <q-icon
                                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                                        class="cursor-pointer"
                                                        @click="isPwd = !isPwd"
                                                        />
                                                    </template>
                                                    </q-input>
                                                    <datalist id="password_list">
                                                    <option v-for="(menu, index) in $menus.user_nameItems" :key="index" :value="menu.value">{{ menu.label }}</option>
                                                    </datalist>
                                                </ValidationProvider>
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
                                                    </div>
                                                    <!--photoDropOptions-->
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="showSubmitButton" class="text-center q-my-md">
                                        <q-btn    :rounded="false"  color="primary"  no-caps  unelevated   type="submit" :disabled="invalid" icon="send" :loading="saving">
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
		name: 'RegisterComponent',
		components: {
		},
		mixins: [PageMixin, AddPageMixin ],
		props:{
			pageName : {
				type : String,
				default : 'users',
			},
			routeName : {
				type : String,
				default : 'usersuserregister',
			},
			apiPath : {
				type : String,
				default : 'auth/register',
			},
		},
		data() {
            return {
				formData: {
					user_name: "", email: "", password: "", photo: "", 
				},
			}
		},
		computed: {
			pageTitle:{
				get: function () {
					return "Add New Users"
				}
			},
		},
		meta() {
			return {
				title: this.pageTitle
			}
		},
		methods: {
			...mapActions('users', ['saveRecord']),
			async startSaveRecord(){
				const isFormValid = await this.$refs.observer.validate();
				if(isFormValid){
					this.saving = true;
					let payload = this.normalizedFormData();
					let url = this.apiUrl;
					let data = { url, payload  }
					this.saveRecord(data).then((response) => {
						this.saving = false;
						this.resetForm();
						let registrationData = response.data;
						if (registrationData.token && registrationData.user) {
							this.$localStore.saveLoginData(registrationData, false);
							window.location = "/";
						}
						else{
							this.flashMsg(registrationData.message);
							this.navigateTo(registrationData.nextpage);
						}
					},
					 (response) => {
						this.saving = false;
						this.showPageRequestError(response);
					});
				}
			},
			resetForm (){
				this.formData = {user_name: "", email: "", password: "", photo: "", };
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
