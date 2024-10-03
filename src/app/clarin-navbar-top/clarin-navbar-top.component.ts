import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, Renderer2, ElementRef, ViewEncapsulation  } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { take } from 'rxjs/operators';
import { EPerson } from '../core/eperson/models/eperson.model';
import { ScriptLoaderService } from './script-loader-service';
import { HALEndpointService } from '../core/shared/hal-endpoint.service';
import { LocaleService } from '../core/locale/locale.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

/**
 * The component which wraps `language` and `login`/`logout + profile` operations in the top navbar.
 */
@Component({
  selector: 'ds-clarin-navbar-top',
  templateUrl: './clarin-navbar-top.component.html',
  styleUrls: ['./clarin-navbar-top.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClarinNavbarTopComponent implements OnInit, AfterViewInit {

  constructor(private authService: AuthService,
              private halService: HALEndpointService,
              private scriptLoader: ScriptLoaderService,
              private localeService: LocaleService,
              private route: ActivatedRoute,
              private renderer: Renderer2,
              private el: ElementRef,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  /**
   * The current authenticated user. It is null if the user is not authenticated.
   */
  authenticatedUser = null;

  /**
   * The server path e.g., `http://localhost:8080/server/api/`
   */
  repositoryPath = '';

  currentLanguage = this.localeService.getCurrentLanguageCode();
  nextLanguage = ['en', 'cs'].find(lang => lang !== this.currentLanguage);

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    let authenticated = false;
    this.loadRepositoryPath();
    this.authService.isAuthenticated()
      .pipe(take(1))
      .subscribe( auth => {
      authenticated = auth;
    });

    if (authenticated) {
      this.authService.getAuthenticatedUserFromStore().subscribe((user: EPerson) => {
        this.authenticatedUser = user;
      });
    } else {
      this.authenticatedUser = null;
    }
  }

  ngAfterViewInit(): void {
    // Load scripts only in the browser and not SSR
    if (isPlatformBrowser(this.platformId)) {
      this.loadScripts();
    }
  }

  loadScripts() {
    // At first load DiscoJuice, second AAI and at last AAIConfig
    this.loadDiscoJuice().then(() => {
      this.loadAAI().then(() => {
        this.loadAAIConfig().catch(error => console.log(error));
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }

  private loadDiscoJuice = (): Promise<any> => {
    return this.scriptLoader.load('discojuice');
  };

  private loadAAI = (): Promise<any> => {
    return this.scriptLoader.load('aai');
  };

  private loadAAIConfig = (): Promise<any> => {
    return this.scriptLoader.load('aaiConfig');
  };

  private loadRepositoryPath() {
    this.repositoryPath = this.halService.getRootHref();
  }

  setLanguage() {
    this.localeService.setCurrentLanguageCode(this.nextLanguage);
    this.localeService.refreshAfterChangeLanguage();
  }

  toggleMainMenu() {
    this.renderer[this.el.nativeElement.classList.contains('menuOpened') ? 'removeClass' : 'addClass'](this.el.nativeElement, 'menuOpened');
  }

  submitSearch() {
    console.log('search');
  }
}
