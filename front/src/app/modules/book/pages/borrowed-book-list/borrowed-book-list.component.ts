import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BookResponse} from "../../../../services/models/book-response";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackService} from "../../../../services/services/feedback.service";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrls: ['./borrowed-book-list.component.scss']
})
export class BorrowedBookListComponent implements OnInit {
  page = 0;
  size = 10;
  pages: any = [];
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  private _selectedBook: BookResponse | undefined;
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: '', note: 0};

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.borrowedBooks = resp;
        this.pages = Array(this.borrowedBooks.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  returnBorrowedBook(borrowedBook: BorrowedBookResponse) {
    this.bookService.findBookById({  'book-id': borrowedBook.id as number
    }).subscribe({
      next: (book: BookResponse) => {
        this._selectedBook = book;
        this.feedbackRequest.bookId = book.id as number;
      },
      error: () => {
        console.error('Failed to fetch the book details');
      }
    });
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id': this._selectedBook?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
          window.location.reload(); // Forces a full page reload

        }
        this._selectedBook = undefined;
        window.location.reload(); // Forces a full page reload

      }
    });

  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {}
    });
  }

  get bookCover(): string {
    if (this._selectedBook?.cover) {
      return 'data:image/jpg;base64,' + this._selectedBook.cover;
    }
    return 'assets/img/theme/team-4-800x800.jpg'; // Default image path
  }

  get selectedBook(): BookResponse | undefined {
    return this._selectedBook;
  }
}
