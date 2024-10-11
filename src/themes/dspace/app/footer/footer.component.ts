import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { ClarinMenusService } from '../../../../app/core/data/clarin/clarin-menus.service';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html',
})
export class FooterComponent implements OnInit {
  constructor(private menuServices: ClarinMenusService, private cdr: ChangeDetectorRef) {}

  footerMenus: any = [];
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.menuServices.menusList.subscribe(result => {
      this.footerMenus = result;
      this.footerMenus = this.footerMenus.menus.filter(menu => menu.reference.includes('FOOTER_REPO'));
      this.cdr.detectChanges();
    });
  }
}
