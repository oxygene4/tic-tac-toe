import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable()
export class ToasterService {

  options: IndividualConfig;

  constructor(
    private toaster: ToastrService
  ) {
    this.options = this.toaster.toastrConfig;
    this.options.timeOut = 4000;
    this.options.closeButton = true;
  }

  showToast(message) {
    this.toaster.show(message, '', this.options, 'toast-warning');
  }
}
