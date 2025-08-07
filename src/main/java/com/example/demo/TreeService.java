package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class TreeService {

    private ID3tree currentTree;
    private String[] attrs = {"Outlook", "Temperature", "Humidity", "Wind"};

    public double calculateAccuracy(String testFile) {
        if (currentTree == null) return 0;

        ArrayList<String[]> testingExamples = TreeUtils.processExamples(testFile);
        String[] filteredRules = TreeUtils.processRules(currentTree.rules, currentTree.trainingExampes);

        double correctCount = 0;
        for (String[] example : testingExamples) {
            for (String rule : filteredRules) {
                String[] parts = rule.split(" ");
                int match = 0;
                for (int i = 0; i < parts.length - 1; i++) {
                    if (TreeUtils.contains(example, parts[i])) {
                        match++;
                    }
                }
                if (match == parts.length - 1) {
                    if (parts[parts.length - 1].equals(example[example.length - 1])) {
                        correctCount++;
                    }
                    break;
                }
            }
        }

        return (correctCount / testingExamples.size()) * 100.0;
    }


    
    public List<String> generateRules(String measure, String trainFile) {
        ArrayList<String[]> trainingExamples = TreeUtils.processExamples(trainFile);
        currentTree = new ID3tree(trainingExamples, attrs, measure);
        return Arrays.asList(currentTree.rules);
    }
}
