import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { adminTypographyComponents } from '@app/data/schema/admin';
import { DataCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { DynamicImportService } from '@app/shared/service/dynamic_import/dynamic-import.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Font, FontInterface, FontPickerService } from '@lib/font-picker/src/public-api';
import {presetFonts} from '@data/schema/admin'
import { LoadingService } from '@app/shared/service/loading/loading.service';
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
})
export class TypographyComponent implements OnInit {
  public color!: string;
  @ViewChild("layoutComponent", { read: ViewContainerRef })
  layoutComponent!: ViewContainerRef;
  styles!: DataCs[];
  isLoaded = this.loader.loading$;
  comps = adminTypographyComponents


  private _presetFonts =  presetFonts

  public font: Font = new Font({
    family: 'Rochester',
    size: '14px',
    style: 'regular',
    styles: ['regular']
  });

  public sizeSelect: boolean = true;
  public styleSelect: boolean = true;

  public presetFonts = this._presetFonts;

    public togglePresetFonts(): void {
    this.presetFonts = this.presetFonts.length ? [] : this._presetFonts;
  }

  public toggleExtraOptions(): void {
    this.sizeSelect = !this.sizeSelect;
    this.styleSelect = !this.styleSelect;
  }

  constructor(private injector: Injector, private dataCsService : DataCsService, private modalService : NgbModal,
    private loadComponentService : DynamicImportService, private fontPickerService : FontPickerService, public loader : LoadingService) {
  }

  ngOnInit() {
    this.loader.show();
    setTimeout(() => this.loader.hide(),1500);
  }

  public editStyles(styleObj : any , dbUrl : string) {
    console.log('edit', styleObj ,dbUrl)
    let curStyle : any = this.styles.find(stylesObj => stylesObj.name === styleObj.name);
    if(typeof curStyle !== "undefined" ){
    Object.keys(curStyle).map(key  => {
      if(styleObj.hasOwnProperty(key)){
        curStyle[key] = styleObj[key];
      }
    })
    this.dataCsService.editStyles(curStyle , dbUrl).subscribe(res => console.log("başarılı: ",res));
    }else{
      console.log("hata");
    }
  }

  public getStyles(dbUrl : string) {
    this.loader.show();
    const $style =  this.dataCsService.getStyles(dbUrl)
    $style.subscribe(styles =>
      {
        this.styles = styles
      });
      var interval = setInterval(() => {
        if(this.styles){
          this.loader.hide();
          clearInterval(interval);
        }else{
        console.log("gelmedi")
        }
      }, 1000)
  }


  async loadForm(layout : string = "") {
    console.log(layout)
    if(/[Ll]ayout/.test(layout))
    setTimeout(() => this.loadComponentService.loadComponent(layout, this.layoutComponent),250);
    else
    setTimeout(() => this.loadComponentService.loadComponent(layout),250);
  }

  isValid(obj : any){
    return typeof obj !== 'undefined'
  }
}
