import {
  printMsg,
  clearConsole,
  readJsonFile,
  writeJsonFile,
} from '../utils/common';
import { blue } from 'chalk';
import { prompt } from 'inquirer';
import * as download from 'download-git-repo';

export interface PackageJSON {
  name: string;
  version: string;
  description: string;
  bin: {
    [key: string]: string;
  };
  scripts: {
    [key: string]: string;
  };
}

export enum TemplateType {
  CLI,
  PROJECT,
}
export interface Template {
  url: string;
  type: TemplateType;
}

export async function selectFeature(): Promise<Template> {
  // 清空命令行
  clearConsole();
  // 输出信息
  /* eslint-disable @typescript-eslint/no-var-requires */
  printMsg(blue(`HO CLI v${require('../../package.json').version}`));
  printMsg('Start initializing the project:');
  printMsg('');
  // 选择功能，这里配合 下面的 installFeature 方法 和 ./installFeature.ts 文件为脚手架提供了良好的扩展机制
  // 将来扩展其它功能只需要在 choices 数组中增加配置项，然后在 ./installFeature.ts 文件中增加相应的安装方法即可
  const { feature } = await prompt([
    {
      name: 'feature',
      type: 'list',
      message: '请选择模板',
      choices: [
        {
          name: 'TS脚手架模板',
          value: {
            url: 'github:hejinzhi/cli-ts-template',
            type: TemplateType.CLI,
          },
        },
        {
          name: 'vue3 vite typescript element 后端管理模板',
          value: {
            url: 'github:hejinzhi/vue3-ts-vite-element-template',
            type: TemplateType.PROJECT,
          },
        },
        {
          name: 'vue2 element 后端管理模板',
          value: {
            url: 'github:hejinzhi/vue2-element-admin-template',
            type: TemplateType.PROJECT,
          },
        },
      ],
    },
  ]);
  return feature as Template;
}

export async function downloadTemplate(
  url: string,
  name: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    download(url, name, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve('Success');
      }
    });
  });
}

export function changePkgName(
  path: string,
  name: string,
  type: TemplateType = TemplateType.PROJECT,
) {
  const packageJson = readJsonFile<PackageJSON>(path);
  packageJson.name = name;
  packageJson.description = name;
  if (type === TemplateType.CLI) {
    packageJson.bin = {
      [name]: './bin/ts-cli.js',
    };
  }
  writeJsonFile(path, packageJson);
}
