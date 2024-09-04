import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit{


  bookResponse: PageResponseBookResponse = {};

  page = 0;
  size = 4;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';
  constructor(
    private bookService: BookService,
    private router: Router ,
    private cdr: ChangeDetectorRef

  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookResponse.content = [];

    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        if (books && books.content) {
          this.bookResponse = books;
          this.pages = Array(this.bookResponse.totalPages).fill(0).map((x, i) => i);

          // Manually trigger change detection to ensure the UI updates
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBooks();
  }


  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage() {
    return this.page === this.bookResponse.totalPages as number - 1;
  }


  displayBookDetails(book: BookResponse) {
    this.router.navigate(['books', 'details', book.id]);
  }

  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    });
  }

  shareBook(book: BookResponse) {
    this.bookService.updateShareableStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }

  editBook(book: BookResponse) {
    this.router.navigate(['book', 'manage', book.id]);
  }
}
