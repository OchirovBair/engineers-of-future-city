import iconEcology from '../assets/images/icon-ecology.png';
import iconEnergy from '../assets/images/icon-energy.png';
import iconInfra from '../assets/images/icon-infra.png';
import iconEconomy from '../assets/images/icon-economy.png';
import iconLaw from '../assets/images/icon-law.png';
import iconResources from '../assets/images/icon-resources.png';
import iconTech from '../assets/images/icon-tech.png';
import type { TranslationKey } from '../i18n/translations';

export type ResourceCode =
  | 'ЭКО'
  | 'ЭНР'
  | 'ИНФ'
  | 'ЭКН'
  | 'ПРВ'
  | 'РЕС'
  | 'ТЕХ';

export interface ResourceDef {
  code: ResourceCode;
  nameKey: TranslationKey;
  start: number;
  icon: string;
  /** true для ЭКО/ЭНР/ПРВ — обнуление = мгновенный провал */
  critical: boolean;
}

export const RESOURCES: ResourceDef[] = [
  {
    code: 'ЭКО',
    nameKey: 'resourceNameEco',
    start: 1,
    icon: iconEcology,
    critical: true,
  },
  {
    code: 'ЭНР',
    nameKey: 'resourceNameEnr',
    start: 1,
    icon: iconEnergy,
    critical: true,
  },
  {
    code: 'ИНФ',
    nameKey: 'resourceNameInf',
    start: 1,
    icon: iconInfra,
    critical: false,
  },
  {
    code: 'ЭКН',
    nameKey: 'resourceNameEkn',
    start: 1,
    icon: iconEconomy,
    critical: false,
  },
  {
    code: 'ПРВ',
    nameKey: 'resourceNamePrv',
    start: 1,
    icon: iconLaw,
    critical: true,
  },
  {
    code: 'РЕС',
    nameKey: 'resourceNameRes',
    start: 2,
    icon: iconResources,
    critical: false,
  },
  {
    code: 'ТЕХ',
    nameKey: 'resourceNameTex',
    start: 1,
    icon: iconTech,
    critical: false,
  },
];
