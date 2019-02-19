import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/shared/header/header.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { UserDetailComponent } from './component/user/user-detail/user-detail.component';
import { AddUserComponent } from './component/user/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UpdateUserComponent } from './component/user/update-user/update-user.component';
import { DatePipe } from '@angular/common';
import { TicketCreationFormComponent } from './component/shared/ticket-creation-form/ticket-creation-form.component';
import { RoleCreateUpdateComponent } from './component/HR-CEO/role-create-update/role-create-update.component';
import { ServiceDeskCreateUpdateComponent } from './component/HR-CEO/service-desk-create-update/service-desk-create-update.component';
import { ServicedescService } from './service/servicedesc.service';
import { ListingComponent } from './component/shared/listing/listing.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserAccessService } from './service/user-access.service';
import { TicketDetailsComponent } from './component/shared/ticket-details/ticket-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserDetailComponent,
    AddUserComponent,
    UpdateUserComponent,
    TicketCreationFormComponent,
    RoleCreateUpdateComponent,
    ServiceDeskCreateUpdateComponent,
    ListingComponent,
    TicketDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [UserService, DatePipe,ServicedescService,UserAccessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
