import { Component } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html',
})
export class FooterComponent extends BaseComponent {
  currentYear = new Date().getFullYear();
  footerLinks = {
    left: {
      sectionTitle: 'LINDAT/CLARIAH-CZ',
      sectionUrl: '',
      items: [
        {title: 'Mission Statement', path: '#'},
        {title: 'Advisory Board', path: '#'},
        {title: 'Events', path: '#'},
        {title: 'CLARIN Participation', path: '#'},
      ]
    },
    middle: {
      sectionTitle: 'Partners',
      sectionUrl: 'https://lindat.cz/partners',
      items: [
        {title: 'Faculty of Mathemtics', path: '#'},
        {title: 'Faculty of Arts', path: '#'},
        {title: 'Faculty of Informatics', path: '#'},
        {title: 'Institute of History', path: '#'},
        {title: 'National Film Archive', path: '#'},
      ],
    },
    right: {
      sectionTitle: 'Services',
      sectionUrl: 'https://lindat.cz/services',
      items: [
        {title: 'Service Status', path: '#'},
        {title: 'About and Policies', path: '#'},
        {title: 'Terms of Use', path: '#'},
      ],
    },
  };
}
