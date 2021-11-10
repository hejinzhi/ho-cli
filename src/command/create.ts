import {
  changePkgName,
  downloadTemplate,
  selectFeature,
} from '../utils/create';

export async function create(name: string) {
  const feature = await selectFeature();
  await downloadTemplate(feature.url, name);
  changePkgName(`${name}/package.json`, name, feature.type);
}
