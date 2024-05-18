import {Component, OnInit} from '@angular/core';
import {BookTransactionResponse} from "../../../../services/models/book-transaction-response";
import {PageResponseBookTransactionResponse} from "../../../../services/models/page-response-book-transaction-response";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrl: './borrowed-books.component.scss'
})
export class BorrowedBooksComponent implements OnInit{

  borrowedBooks: PageResponseBookTransactionResponse = {};
  page = 0;
  size = 8;
  selectedBook: BookTransactionResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: '', note: 0};

  constructor(
    private bookService: BookService,
    private router: Router,
    private feedbackService: FeedbackService
  ) {
  }

  returnBorrowedBook(book: BookTransactionResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

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
      },
      error: (err) => {
        console.log(err);
        if (err.status as number === 403) {
          this.router.navigate(['login'], {queryParams: {tokenExpired: true}});
        }
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllBorrowedBooks();
  }
  get isLastPage(): boolean {
    return this.page == this.borrowedBooks.totalPages as number - 1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        } else {
          this.selectedBook = undefined;
          this.findAllBorrowedBooks();
        }
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    });
  }
}
