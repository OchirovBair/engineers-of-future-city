import iconEcology from '../assets/images/icon-ecology.png'
import iconEnergy from '../assets/images/icon-energy.png'
import iconInfra from '../assets/images/icon-infra.png'
import iconEconomy from '../assets/images/icon-economy.png'
import iconLaw from '../assets/images/icon-law.png'
import iconResources from '../assets/images/icon-resources.png'
import iconTech from '../assets/images/icon-tech.png'

export type ResourceCode = 'ЭКО' | 'ЭНР' | 'ИНФ' | 'ЭКН' | 'ПРВ' | 'РЕС' | 'ТЕХ'

export interface ResourceDef {
  code: ResourceCode
  name: string
  start: number
  icon: string
  /** true для ЭКО/ЭНР/ПРВ — обнуление = мгновенный провал */
  critical: boolean
}

export const RESOURCES: ResourceDef[] = [
  { code: 'ЭКО', name: 'Экология',       start: 2, icon: iconEcology,   critical: true  },
  { code: 'ЭНР', name: 'Энергетика',       start: 2, icon: iconEnergy,    critical: true  },
  { code: 'ИНФ', name: 'Инфраструктура',  start: 1, icon: iconInfra,     critical: false },
  { code: 'ЭКН', name: 'Экономика',       start: 2, icon: iconEconomy,   critical: false },
  { code: 'ПРВ', name: 'Закон и порядок', start: 1, icon: iconLaw,       critical: true  },
  { code: 'РЕС', name: 'Ресурсы',         start: 3, icon: iconResources, critical: false },
  { code: 'ТЕХ', name: 'Технологии',      start: 1, icon: iconTech,      critical: false },
]
