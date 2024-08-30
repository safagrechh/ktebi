import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { MainComponent } from './pages/main/main.component';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from "../../components/components.module";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {BookCardComponent} from "./pages/book-card/book-card.component";
import {RatingComponent} from "./pages/rating/rating.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {AppModule} from "../../app.module";
import {BorrowedBookListComponent} from "./pages/borrowed-book-list/borrowed-book-list.component";
import {MyBooksComponent} from "./pages/my-books/my-books.component";
import {ReturnedBooksComponent} from "./pages/returned-books/returned-books.component";
import {ManageBookComponent} from "./pages/manage-book/manage-book.component";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    MainComponent ,
    BookListComponent,
    BookCardComponent ,
    RatingComponent,
    MyBooksComponent,
    ReturnedBooksComponent,
    BorrowedBookListComponent,
    ManageBookComponent
  ],
    imports: [
        CommonModule,
        BookRoutingModule,
        FormsModule,
        ComponentsModule,
        MatTooltipModule,
        MatButtonModule,
        AppModule,
        NgbDropdownModule
    ]
})
export class BookModule { }
