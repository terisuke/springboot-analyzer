package com.example.analyzer.model;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class ClassInfo {
    private String className;
    private int methodCount;
    private int lineCount;
    private List<String> methodNames;
    private Map<String, String> methodSources; // メソッド名とそのソースコードのマップ
    // getters, setters
    public Map<String, String> getMethodSources() {
        return methodSources;
    }
    public void setMethodSources(Map<String, String> methodSources) {
        this.methodSources = methodSources;
    }
}