import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit{

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

    this.bookService.findAllBooks({
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

  borrowBook(book: BookResponse) {
    this.message = '';
    this.level = 'success';
    this.bookService.borrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book successfully added to your list';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      }
    });
  }

  displayBookDetails(book: BookResponse) {
    this.router.navigate(['book', 'details', book.id]);
  }
}
