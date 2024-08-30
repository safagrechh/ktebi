import { Component, OnInit } from '@angular/core';
import { BookRequest } from "../../../../services/models/book-request";
import { BookService } from "../../../../services/services/book.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent implements OnInit {

  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };
  selectedBookCover: any;
  selectedPicture: string | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      // Fetch and populate book data for editing
      this.bookService.findBookById({ 'book-id': bookId }).subscribe({
        next: (book) => {
          console.log('Book Data:', book);

          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable,
          };

          if (book.cover) {
            this.selectedPicture = 'data:image/jpg;base64,' + book.cover;
          }
        },
        error: (err) => {
          console.error('Error fetching book:', err);
        }
      });
    }
  }

  saveBook() {
    const isCreating = !this.bookRequest.id;

    this.bookService.saveBook({ body: this.bookRequest }).subscribe({
      next: (bookId) => {
        if (isCreating || this.selectedBookCover) {
          // Upload the cover if a new file is selected or if creating a new book
          this.bookService.uploadBookCoverPicture({
            'book-id': isCreating ? bookId : this.bookRequest.id,
            body: {
              file: this.selectedBookCover
            }
          }).subscribe({
            next: () => {
              this.router.navigate(['/book/my-books']);
            },
            error: (err) => {
              console.log(err.error);
              this.errorMsg = err.error.validationErrors;
            }
          });
        } else {
          // No new cover selected or created, just navigate to the next page
          this.router.navigate(['/book/my-books']);
        }
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }



  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);

    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }
}
