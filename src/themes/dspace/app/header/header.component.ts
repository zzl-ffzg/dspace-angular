import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';
import { ClarinMenusService } from '../../../../app/core/data/clarin/clarin-menus.service';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private menuServices: ClarinMenusService, private cdr: ChangeDetectorRef) {}

  links: any = [];

  async ngOnInit() {
    try {
      await this.menuServices.getMenus();

      this.menuServices.menusList.subscribe(result => {
        this.links = result;
        this.links = this.links.menus.find(menu => menu.reference === 'HEADER').items_tree;
        this.cdr.detectChanges();
      });
    } catch (error) {
      console.log(error);
    }
  }

  toggleSubmenuClass(event) {
    let activeDropdown = Array.from(document.querySelectorAll('.clarin-header-dropdown-button')).find(link => link.classList.contains('active'));

    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active');
    } else {
      if (activeDropdown) {
        activeDropdown.classList.remove('active');
      }
      event.target.classList.add('active');
    }
  }
}
