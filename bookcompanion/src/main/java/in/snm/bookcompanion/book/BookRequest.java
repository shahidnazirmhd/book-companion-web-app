package in.snm.bookcompanion.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record BookRequest(

        Long id,
        @NotBlank(message = "100")
        String title,
        @NotBlank(message = "101")
        String authorName,
        @NotBlank(message = "102")
        String isbn,
        @NotEmpty(message = "103")
        String synopsis,
        boolean shareable

) {}
