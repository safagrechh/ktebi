package com.symatique.ktebi.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequest {

    @NotEmpty(message="First name is required ")
    @NotBlank(message="First name is required ")
    private String firstname ;
    @NotEmpty(message="lastname is required ")
    @NotBlank(message="lastname is required ")
    private String lastname ;
    @Email(message =" email is not valid")
    @NotEmpty(message="email is required ")
    @NotBlank(message="email is required ")
    private String email ;
    @NotEmpty(message="password is required ")
    @NotBlank(message="password is required ")
    @Size(min=8 , message=" password min 8 characters")
    private String password ;
}
