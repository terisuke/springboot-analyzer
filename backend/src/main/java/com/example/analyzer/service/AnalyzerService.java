package com.example.analyzer.service;

import com.example.analyzer.model.AnalysisResult;
import com.example.analyzer.model.ClassInfo;
import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
public class AnalyzerService {

    public AnalysisResult analyzeZipFile(MultipartFile zipFile) throws IOException {
        AnalysisResult result = new AnalysisResult();
        List<ClassInfo> classes = new ArrayList<>();
        
        try (ZipInputStream zis = new ZipInputStream(zipFile.getInputStream())) {
            ZipEntry entry;
            while ((entry = zis.getNextEntry()) != null) {
                if (entry.getName().endsWith(".java")) {
                    String javaFileContent = new String(zis.readAllBytes());
                    CompilationUnit cu = StaticJavaParser.parse(javaFileContent);
                    analyzeCompilationUnit(cu, classes);
                }
                zis.closeEntry(); // この行でエントリを閉じます
            }
        }
        
        result.setClasses(classes);
        result.setTotalFiles(classes.size());
        result.setTotalClasses(classes.size());
        result.setTotalMethods(classes.stream().mapToInt(ClassInfo::getMethodCount).sum());
        
        return result;
    }

    private void analyzeCompilationUnit(CompilationUnit cu, List<ClassInfo> classes) {
    cu.findAll(ClassOrInterfaceDeclaration.class).forEach(cls -> {
        ClassInfo classInfo = new ClassInfo();
        classInfo.setClassName(cls.getNameAsString());
        classInfo.setMethodCount(cls.getMethods().size());
        classInfo.setLineCount(cls.getEnd().get().line - cls.getBegin().get().line);
        
        // メソッド名のリストを設定
        classInfo.setMethodNames(cls.getMethods().stream()
                .map(method -> method.getNameAsString())
                .toList());
        
        // メソッドのソースコードを取得
        Map<String, String> methodSources = new HashMap<>();
        cls.getMethods().forEach(method -> {
            methodSources.put(
                method.getNameAsString(),
                method.toString()
            );
        });
        classInfo.setMethodSources(methodSources);
        
        classes.add(classInfo);
        });
    }
}