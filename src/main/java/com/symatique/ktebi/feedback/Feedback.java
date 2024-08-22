package com.symatique.ktebi.feedback;

import com.symatique.ktebi.book.Book;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Feedback {

   @Id
   @GeneratedValue
   private Long id ;
    private Double note ;
    private String comment ;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book  book ;
    @CreatedDate
    @Column(nullable = false , updatable = false)
    private LocalDateTime createdDate ;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate ;

    @CreatedBy
    @Column(nullable = false , updatable = false)
    private Long createdBy ;

    @LastModifiedBy
    @Column(insertable = false)
    private Long lastModifiedBy ;

}
