import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly headerHidden = signal(false);
  protected readonly headerCompact = signal(false);
  private lastScrollTop = 0;

  ngOnInit(): void {
    this.authService.restoreSession().subscribe();
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    const currentScrollTop = Math.max(window.scrollY, 0);
    const scrollingDown = currentScrollTop > this.lastScrollTop;

    this.headerCompact.set(currentScrollTop > 24);

    if (currentScrollTop < 80) {
      this.headerHidden.set(false);
    } else if (scrollingDown && currentScrollTop > 140) {
      this.headerHidden.set(true);
    } else if (!scrollingDown) {
      this.headerHidden.set(false);
    }

    this.lastScrollTop = currentScrollTop;
  }

  protected logout(): void {
    this.authService.logout().subscribe(() => {
      void this.router.navigateByUrl('/');
    });
  }
}
