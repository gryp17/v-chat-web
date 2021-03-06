<template>
	<div id="app">
		<LoadingIndicator
			v-show="loading"
			full-screen
		/>
		<router-view />
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters, mapActions } from 'vuex';

	import { getVisibilityEventName, windowIsHidden } from '@/utils/visibility';
	import { resetTitle } from '@/utils/taskbar';

	import errorsMap from '@/filters/errorsMap';
	import FormInput from '@/components/forms/FormInput';
	import FormFileInput from '@/components/forms/FormFileInput';
	import FormButton from '@/components/forms/FormButton';
	import FormSwitch from '@/components/forms/FormSwitch';
	import LoadingIndicator from '@/components/LoadingIndicator';

	//global filters
	Vue.filter('errorsMap', errorsMap);

	//global components
	Vue.component('FormInput', FormInput);
	Vue.component('FormFileInput', FormFileInput);
	Vue.component('FormButton', FormButton);
	Vue.component('FormSwitch', FormSwitch);

	export default {
		components: {
			LoadingIndicator
		},
		computed: {
			...mapGetters('ui', [
				'loading'
			]),
			...mapGetters('auth', [
				'isLoggedIn'
			])
		},
		created() {
			this.initializeApp();
			this.listenForVisibilityEvents();
		},
		methods: {
			...mapActions('ui', [
				'setLoading',
				'setFocused'
			]),
			...mapActions('auth', [
				'getUserSession'
			]),
			/**
			 * Initializes the app by figuring out which page to show
			 */
			async initializeApp() {
				this.setLoading(true);

				//get the user session
				await this.getUserSession();
				const page = this.isLoggedIn ? 'chat' : 'authentication';
				await this.redirectTo({
					name: page
				});

				this.setLoading(false);
			},
			/**
			 * Proxy function redirects to the specified path
			 * It's used in order to catch any NavigationDuplicated exceptions
			 * @param {String} path
			 */
			redirectTo(path) {
				return this.$router.push(path).catch(() => {});
			},
			/**
			 * Listens for the visibility events and updates the focused property
			 */
			listenForVisibilityEvents() {
				const eventName = getVisibilityEventName();
				if (eventName) {
					document.addEventListener(eventName, () => {
						const focused = !windowIsHidden();
						this.setFocused(focused);

						if (focused) {
							resetTitle();
						}
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	@import '~@/assets/css/_vue-tabs';
	@import '~@/assets/css/_vue-toasted';

	@font-face {
		font-family: "Roboto Mono";
		src: url(~@/assets/fonts/RobotoMono-Regular.woff2) format("woff2"),
			url(~@/assets/fonts/RobotoMono-Regular.woff) format("woff"),
			url(~@/assets/fonts/RobotoMono-Regular.ttf) format("truetype");
		font-weight: normal;
		font-style: normal;
	}

	*,
	:after,
	:before {
		box-sizing:border-box;
	}

	body, html {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	body {
		background: $background;
		font-family:  $font-family;
		color: $text-color;

		:focus {
			outline: none;
		}

		::-moz-focus-inner {
			border: 0;
		}

		input {
			filter: none;
		}

		button:focus {
			outline: none;
		}

		a {
			color: $blue-light;
		}

		#app {
			display: flex;
			flex-direction: column;
			height: 100%;
		}
	}
</style>
