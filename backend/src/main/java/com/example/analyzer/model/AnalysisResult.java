package com.example.analyzer.model;

import lombok.Data;
import java.util.List;

@Data
public class AnalysisResult {
    private int totalFiles;
    private int totalClasses;
    private int totalMethods;
    private List<ClassInfo> classes;
}