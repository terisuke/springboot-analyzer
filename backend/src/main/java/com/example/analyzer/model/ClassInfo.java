package com.example.analyzer.model;

import lombok.Data;
import java.util.List;

@Data
public class ClassInfo {
    private String className;
    private int methodCount;
    private int lineCount;
    private List<String> methodNames;
}