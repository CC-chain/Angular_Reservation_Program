import { ChangeDetectionStrategy, Component, createNgModuleRef, ElementRef, Injector, Input, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { default_authLayout } from '@app/data/schema/defaultData';
import { DataCs } from '@data/schema/data';
import { DataCsService } from '@data/service/data-cs.service';
import { isObservable, Observable, of } from 'rxjs';


@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent implements OnInit {
  @ViewChild("contentComponent", { read: ViewContainerRef })
  public contentComponent!: ViewContainerRef;
  styles: Observable<DataCs[]> = of(default_authLayout);
  constructor(private injector: Injector, private dataCsService : DataCsService) {
  }

  ngOnInit(): void {
    this.getStyles();
  }

  private getStyles() {
    this.styles =  this.dataCsService.getStyles('Component/AuthLayout')
    this.styles.subscribe(styles => {
     console.log(styles)
  });
}

getFirst(dataCs : DataCs[] | null){
  if(dataCs){
    let newData = dataCs[0];
    newData.backgroundImage = "url('"+newData.backgroundImage+"')"
    return newData
  }
  else return {};
}



}
