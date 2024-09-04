import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

    { path: '/book', title: 'Books',  icon:'ni-books text-red', class: '' },
  { path: '/book/my-books', title: 'My Books ',  icon:'ni-book-bookmark text-red', class: '' },
  { path: '/book/my-waiting-list', title: 'My Waiting List',  icon:'ni-favourite-28 text-red', class: '' },
  { path: '/book/my-returned-books', title: 'Returned Books ',  icon:'ni-archive-2 text-red', class: '' },
  { path: '/book/my-borrowed-books', title: 'Borrowed Books ',  icon:'ni-folder-17 text-red', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public userName: string | null = null; // To hold the user name

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    // Fetch user information from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      this.userName = JSON.parse(user).name; // Adjust this according to the structure of your user object
    }

    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Also remove user info on logout
    this.router.navigate(['auth/login']).then(() => {
      window.location.reload(); // Forces a full page reload
    });
  }
}
