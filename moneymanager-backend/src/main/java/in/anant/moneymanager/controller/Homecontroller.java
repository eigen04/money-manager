package in.anant.moneymanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/status", "/health"})
public class Homecontroller {

    @GetMapping
    public String healthCheck() {
        return "Money Manager is up and running!";
    }
}
