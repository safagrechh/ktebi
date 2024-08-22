package com.symatique.ktebi.book;

import com.symatique.ktebi.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
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
public class BookTransactionHistory {

    @Id
    @GeneratedValue
    private Long id ;

    private boolean returned ;
    private boolean returnApproved ;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user ;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book ;



    @CreatedDate
    @Column(nullable = false , updatable = false)
    private LocalDateTime createdDate ;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate ;
}
