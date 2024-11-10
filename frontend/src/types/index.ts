// 分析結果の型定義
export interface AnalysisResult {
  controllers: ControllerInfo[];
  services: ServiceInfo[];
  endpoints: EndpointInfo[];
}

export interface ControllerInfo {
  name: string;
  path: string;
  endpoints: EndpointInfo[];
}

export interface ServiceInfo {
  name: string;
  methods: MethodInfo[];
  dependencies: string[];
}

export interface EndpointInfo {
  path: string;
  method: HttpMethod;
  parameters: ParameterInfo[];
  returnType: string;
}

export interface MethodInfo {
  name: string;
  parameters: ParameterInfo[];
  returnType: string;
  documentation?: string;
}

export interface ParameterInfo {
  name: string;
  type: string;
  required: boolean;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 分析状態の型定義
export interface AnalysisStatus {
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'ERROR';
  progress?: number;
  message?: string;
}