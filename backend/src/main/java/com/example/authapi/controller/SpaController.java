package com.example.authapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({"/sign-in", "/sign-up", "/welcome"})
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
