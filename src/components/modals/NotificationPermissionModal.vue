<template>
	<div class="notification-permission-modal">
		<modal
			:adaptive="true"
			:width="'100%'"
			:maxWidth="460"
			:height="'auto'"
			name="notification-permission-modal"
			@closed="onClose"
		>
			<div class="header">
				Notifications permission
			</div>
			<div class="content">
				Would you like to receive notifications?

				<div class="buttons-wrapper">
					<FormButton
						@click="allow"
					>
						Allow
					</FormButton>
					<FormButton
						transparent
						@click="deny"
					>
						Deny
					</FormButton>
				</div>
			</div>
		</modal>
	</div>
</template>

<script>
	import { setNotificationPermissionRequested, requestNotificationPermission } from '@/utils/notifications';

	export default {
		methods: {
			/**
			 * Handles the allow button click event
			 */
			allow() {
				requestNotificationPermission();
				this.closeModal();
			},
			/**
			 * Handles the deny button click event
			 */
			deny() {
				this.closeModal();
			},
			/**
			 * Handles the modal close event
			 * Sets the neessary cookie in order to avoid showing the modal again
			 */
			onClose() {
				setNotificationPermissionRequested(true);
			},
			/**
			 * Closes the modal
			 */
			closeModal() {
				this.$modal.hide('notification-permission-modal');
			}
		}
	};
</script>

<style lang="scss">
	.notification-permission-modal {
		.header {
			padding: 10px;
			background-color: $gray-very-dark;
			color: $white;
			font-weight: bold;
		}

		.content {
			padding: 10px;
			text-align: center;

			.buttons-wrapper {
				padding-top: 10px;
				text-align: center;

				.form-button {
					margin-right: 5px;
				}
			}
		}
	}
</style>
