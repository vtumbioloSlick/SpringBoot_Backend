package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TreeController {

    @Autowired
    private TreeService treeService;

    // Setup Accuracy Endpoint
    @GetMapping("/accuracy")
    public double getAccuracy() {
        return treeService.calculateAccuracy("Tennis-Test.txt");
    }

    // Learned Rules Endpoint
    @GetMapping("/rules")
    public List<String> getRules(@RequestParam String measure) {
        return treeService.generateRules(measure, "Tennis-Train.txt");
    }


}
