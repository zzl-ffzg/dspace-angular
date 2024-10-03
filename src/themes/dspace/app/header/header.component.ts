import { Component } from '@angular/core';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
})
export class HeaderComponent extends BaseComponent {
  links = [
    {text: 'O nama', url: ''},
    {text: 'Novosti', url: ''},
    {text: 'HR-CLARIN konzorcij', url: ''},
    {text: 'Repozitorij', url: ''},
    {text: 'Korpusi', url: ''},
    {text: 'Centri', url: '', items: [
      {text: 'Croatina', url: ''}
    ]},
    {text: 'Zbivanja', url: ''},
    {text: 'Kontakt', url: ''},
  ];

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
