<template>
	<div class="row">
		<div v-for="(file, index) in files"  :key="index">
			<q-chip square removable @remove="removeFile(index)"	v-if="file.isImage">
				<q-avatar><image-viewer :src="file.path" :image-size="file.size"></image-viewer></q-avatar>
			</q-chip>
			<q-chip square icon="archive" removable @remove="removeFile(index)" clickable @click="openFile(file)" :label="file.name" v-else></q-chip>
		</div>
	</div>
</template>
<script>
	import ImageViewer from "./ImageViewer.vue";
    export default {
        props: {
            value: {
				type: String,
			},
            width: {
				type: String,
				required: false,
				default: '50px'
			},
			height: {
				type: String,
				required: false,
				default: '50px'
			},
			numDisplay: {
				type: Number, 
				required: false,
				default: 1
			}, 
        },
		components: {
			ImageViewer
		},
        data: function() {
            return {
				files: [],
				imageDialog: false,
				currentImage: null,
            };
		},
		computed: {
			
		},
		watch: {
			value(){
				this.setFiles();
			},
			files: function(){
				let filePaths = [];
				this.files.forEach(file => {
					if(file.path){
						filePaths.push(file.path);
					}
				});
				this.$emit( 'input', filePaths.toString());
			},
		},
        methods: {
			openFile(file){
				if(file.path){
					window.open(file.path, '_blank');
				}
			},
            openImage(image){
				this.imageDialog = true;
				this.currentImage = image;
			},
			setFiles(){
				if(this.value){
					let filePaths = this.value.toString().split(",");
					this.files = [];
					filePaths.forEach(path => {
						let fileName = path.split('\\').pop().split('/').pop();
						let ext = fileName.split('.').pop().toLowerCase();
						let imgExt = ['jpg', 'png', 'gif', 'jpeg', 'bmp'];
						let isImage = false;
						if(imgExt.indexOf(ext) > -1){
							isImage = true;
						}

						let size = "small"; //use resize image for the display
						if(path.indexOf("temp/") > -1){
							size = "";  //if image is still in temp folder use the original image
						}

						this.files.push({
							name: fileName,
							isImage: isImage,
							size: size,
							path: path
						})
					});
				}
			},
			removeFile(index){
				this.files.splice(index,1);
			}
		},
		mounted() {
			this.setFiles();
		},
    }
</script>
