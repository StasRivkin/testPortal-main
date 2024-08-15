import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { lastValueFrom } from 'rxjs';
import { SohoMessageService } from 'ids-enterprise-ng';
import { Log } from '@infor-up/m3-odin';

@Component({
   selector: 'app-customer',
   templateUrl: './customer.component.html',
   styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

   customerName: string;
   customerPhone: string;
   customerAddress: string;
   customerEmail: string;


   constructor(
      private apiService: ApiServiceService,
      private SohoMessageService: SohoMessageService,

   ) { }

   ngOnInit(): void {
   }

   async loadCustomer() {
      const inputFields = {
         customerName: this.customerName,
         customerAddress: this.customerAddress,
         telephone: this.customerPhone,
         eMail: this.customerEmail
      };
      try {
         const res = await lastValueFrom(this.apiService.postRequest(inputFields));
         Log.error("error");
         Log.info(JSON.stringify(res));
         if (res.lastError != undefined){
            this.SohoMessageService.error({ title: "שגיאה", message: res.message + " " + res.lastError, showCloseBtn: true }).open();
         }else{
            this.SohoMessageService.message({ title: "מעודכן", message: "עודכן בהצלחה", showCloseBtn: true }).open();
         }


      } catch (error) {
         Log.error(error);
         this.SohoMessageService.error({ title: "שגיאה", message: error, showCloseBtn: true }).open();
      }
   }

}
