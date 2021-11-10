import {
  changePkgName,
  downloadTemplate,
  selectFeature,
} from '../utils/create';
// import ora from 'ora';

export async function create(name: string) {
  const feature = await selectFeature();
  // const spinner = ora('正在下载...').start();
  await downloadTemplate(feature.url, name);
  // spinner.stop();
  changePkgName(`${name}/package.json`, name, feature.type);
}
