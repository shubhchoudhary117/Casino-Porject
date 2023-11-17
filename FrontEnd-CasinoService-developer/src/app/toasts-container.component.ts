import { Component, Input, TemplateRef } from '@angular/core';

import { ToastService } from './toast.service';

@Component({
	selector: 'app-toasts',
	template: `
		<ngb-toast
			*ngFor="let toast of toastService.toasts"
			[class]="toast.classname"
			[autohide]="true"
			[delay]="toast.delay || 5000"
			(hidden)="toastService.remove(toast)"
		>
			<ng-template [ngIf]="removeToast(toast)" [ngIfElse]="text">
				<ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
			</ng-template>

			<ng-template #text>{{ toast.textOrTpl }}</ng-template>
		</ngb-toast>
	`,
	host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },

	// host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainerComponent {
  @Input() toasts: any[] = [];
	constructor(public toastService: ToastService) {}

  removeToast(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
