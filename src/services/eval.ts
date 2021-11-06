import vm from 'vm';
import * as ts from 'typescript';

export const evaluate = (
  code: string,
  fnName: string,
  inputs: any[] = [],
  timeout = 5000
) => {
  code = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  code = `${code}\n
  ${fnName}(${inputs
    .map((t) => (Array.isArray(t) ? `[${t}]` : t))
    .join(', ')});`;
  console.log(code);
  const script = new vm.Script(code);
  return script.runInNewContext({}, { timeout });
};
