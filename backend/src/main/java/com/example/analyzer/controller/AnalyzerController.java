package com.example.analyzer.controller;

import com.example.analyzer.model.AnalysisResult;
import com.example.analyzer.service.AnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AnalyzerController {

    @Autowired
    private AnalyzerService analyzerService;

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResult> analyzeCode(@RequestParam("file") MultipartFile zipFile) {
        try {
            AnalysisResult result = analyzerService.analyzeZipFile(zipFile);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}